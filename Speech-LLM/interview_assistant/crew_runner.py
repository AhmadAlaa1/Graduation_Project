from __future__ import annotations
from crewai import Crew, Process
from .agents import build_agents
from .tasks import make_question_task, make_safety_task, make_eval_task, make_coach_task

def _task_text(task) -> str:
    out = getattr(task, "output", None)
    if out is None:
        return ""
    if hasattr(out, "raw"):
        return out.raw
    return str(out)

def run_question_only(role: str, level: str, q_num: int, total_q: int, history_text: str, llm=None):
    interviewer, _, _, safety = build_agents(llm=llm)

    q_task = make_question_task(interviewer, q_num, total_q, role, level, history_text)
    safety_task = make_safety_task(safety, context_tasks=[q_task])

    crew = Crew(
        agents=[interviewer, safety],
        tasks=[q_task, safety_task],
        process=Process.sequential,
        verbose=True,
    )
    crew.kickoff()
    return {
        "question": _task_text(q_task),
        "safety": _task_text(safety_task),
    }

def run_evaluation_and_coaching(role: str, level: str, question_text: str, answer_text: str, llm=None):
    _, evaluator, coach, safety = build_agents(llm=llm)

    eval_task = make_eval_task(
        evaluator,
        answer_text=answer_text,
        role=role,
        level=level,
        question_text=question_text,
    )
    coach_task = make_coach_task(coach, context_tasks=[eval_task])
    safety_task = make_safety_task(safety, context_tasks=[coach_task])

    crew = Crew(
        agents=[evaluator, coach, safety],
        tasks=[eval_task, coach_task, safety_task],
        process=Process.sequential,
        verbose=True,
    )
    crew.kickoff()
    eval_out = getattr(eval_task, "output", None)
    return {
        "evaluation": eval_out,
        "coach": _task_text(coach_task),
        "safety": _task_text(safety_task),
    }
