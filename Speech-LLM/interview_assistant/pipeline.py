from __future__ import annotations
import json
import time
from pathlib import Path
from rich import print
from rich.prompt import Prompt

from .config import Settings
from .encoder import WhisperEncoder
from .decoder import GTTSDecoder
from .llm import LLMClient
from .session import Session
from .schemas import EvaluationResult
from .prompts import EVALUATOR_SYSTEM, COACH_SYSTEM, RUBRICS
from .crew_runner import run_question_only, run_evaluation_and_coaching
from .utils import redact_pii, simple_safety_check, utc_now_iso

# For now, we keep recording simple: user provides a path to an audio file.
# Replace this with Gradio/Streamlit/WebRTC later.
def run_cli_interview(settings: Settings, num_questions: int = 5, answer_seconds: int = 20):
    print("[bold]AI Interview Assistant (CLI template)[/bold]")
    print("Tip: For real voice interaction, wire this into Gradio/Web UI.")

    # Encoder / decoder
    encoder = WhisperEncoder(
        model_name=settings.whisper_model,
        device=settings.whisper_device,
        language=settings.language,
        use_vad=settings.whisper_vad,
        vad_threshold=settings.whisper_vad_threshold,
        chunk_seconds=settings.whisper_chunk_seconds,
    )
    decoder = GTTSDecoder(lang=settings.tts_lang, cache_dir=settings.tts_cache_dir)

    # LLM
    llm = LLMClient(
        openai_api_key=settings.openai_api_key,
        openai_model=settings.openai_model_name,
        hf_model_name=settings.hf_model_name,
        hf_device=settings.hf_device,
    )

    session = Session()
    started_at = utc_now_iso()

    for i in range(1, num_questions + 1):
        # 1) Generate question
        history_text = session.history_text(keep_last=settings.summary_keep_last)
        if settings.use_crewai:
            turn = run_question_only(
                role=settings.role,
                level=settings.level,
                q_num=i,
                total_q=num_questions,
                history_text=history_text or settings.role,
            )
            q = (turn.get("question") or "").strip()
            safety = (turn.get("safety") or "").strip()
        else:
            t0 = time.perf_counter()
            q = llm.chat([
                {"role": "system", "content": "أنت مساعد مقابلات عمل. اسأل سؤال واحد فقط بالعربية."},
                {"role": "user", "content": f"اسأل سؤال رقم {i} من {num_questions} عن {settings.role}. سياق سابق:\n{history_text}"},
            ])
            session.add_metric("llm_question", time.perf_counter() - t0, {"index": i})
            safety = simple_safety_check(q)

        if not q or safety != "OK":
            q = "احكِ عن مشروع نفذته مؤخرًا وما الذي تعلمته منه."
        print(f"\n[bold]Q{i}:[/bold] {q}")

        # 2) (Optional) TTS
        out_mp3 = f"question_{i}.mp3"
        try:
            t0 = time.perf_counter()
            tts_path = decoder.speak_to_file(q, out_mp3)
            session.add_metric("tts", time.perf_counter() - t0, {"index": i})
            print(f"[dim]Saved TTS to {tts_path}[/dim]")
        except Exception as e:
            print(f"[yellow]TTS skipped:[/yellow] {e}")

        # 3) Collect answer audio path
        audio_path = Prompt.ask(f"Path to your recorded answer audio for Q{i} (or leave empty to type)")
        if audio_path.strip():
            try:
                t0 = time.perf_counter()
                answer_text = encoder.transcribe(audio_path.strip())
                session.add_metric("asr", time.perf_counter() - t0, {"index": i})
                print(f"[cyan]Transcribed:[/cyan] {answer_text}")
            except Exception as e:
                print(f"[yellow]ASR failed:[/yellow] {e}")
                answer_text = Prompt.ask("Type your answer instead")
        else:
            answer_text = Prompt.ask("Type your answer")
        answer_text = redact_pii(answer_text)

        # 4) Feedback
        if settings.use_crewai:
            eval_turn = run_evaluation_and_coaching(
                role=settings.role,
                level=settings.level,
                question_text=q,
                answer_text=answer_text,
            )
            evaluation = eval_turn.get("evaluation")
            feedback = (eval_turn.get("coach") or "").strip()
        else:
            rubric = RUBRICS.get(settings.level, "")
            try:
                t0 = time.perf_counter()
                evaluation = llm.chat_json([
                    {"role": "system", "content": f"{EVALUATOR_SYSTEM}\nالRubric: {rubric}"},
                    {"role": "user", "content": f"السؤال: {q}\nالإجابة: {answer_text}\n"},
                ], EvaluationResult)
                session.add_metric("llm_eval", time.perf_counter() - t0, {"index": i})
            except Exception as e:
                print(f"[yellow]Eval failed:[/yellow] {e}")
                evaluation = EvaluationResult(score=0, strengths=[], gaps=[], better_answer="", followup_question="")
            try:
                t0 = time.perf_counter()
                feedback = llm.chat([
                    {"role": "system", "content": COACH_SYSTEM},
                    {"role": "user", "content": evaluation.model_dump_json()},
                ])
                session.add_metric("llm_coach", time.perf_counter() - t0, {"index": i})
            except Exception as e:
                print(f"[yellow]Coaching failed:[/yellow] {e}")
                feedback = "تعذر توليد التغذية الراجعة الآن. حاول مرة أخرى."
        print(f"[green]Feedback:[/green] {feedback}")

        if isinstance(evaluation, EvaluationResult):
            score = evaluation.score
        elif isinstance(evaluation, dict):
            score = evaluation.get("score")
        else:
            score = None
        session.add(question=q, answer_text=answer_text, feedback=feedback, score=score)

        # Summarize old turns to keep context tight
        if settings.summarize_after > 0 and len(session.history) >= settings.summarize_after:
            old_items = session.history[:-settings.summary_keep_last] if settings.summary_keep_last > 0 else session.history
            if old_items:
                history_block = "\n".join([f"س: {x.question}\nج: {x.answer_text}" for x in old_items])
                t0 = time.perf_counter()
                session.summary = llm.chat([
                    {"role": "system", "content": "اختصر تاريخ المقابلة باختصار شديد (نقاط أساسية فقط)."},
                    {"role": "user", "content": history_block},
                ])
                session.add_metric("llm_summary", time.perf_counter() - t0, {"count": len(old_items)})

    print("\n[bold]Done.[/bold]")
    log_payload = {
        "started_at": started_at,
        "ended_at": utc_now_iso(),
        "settings": settings.model_dump(),
        "summary": session.summary,
        "history": [item.model_dump() for item in session.history],
        "metrics": [m.__dict__ for m in session.metrics],
    }
    Path(settings.session_log_path).parent.mkdir(parents=True, exist_ok=True)
    with open(settings.session_log_path, "w", encoding="utf-8") as f:
        json.dump(log_payload, f, ensure_ascii=False, indent=2)
    print(f"[dim]Saved session log to {settings.session_log_path}[/dim]")
    return session.history
