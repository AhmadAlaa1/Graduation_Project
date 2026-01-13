# AI Interview Assistant (Template)

Starter template to refactor your notebook into a small Python project:

- **Encoder (ASR)**: speech → text (Whisper wrapper)
- **LLM**: question + evaluation + coaching
- **Decoder (TTS)**: text → speech (gTTS wrapper)
- **CrewAI**: multiple agents (Interviewer, Evaluator, Coach, Safety)

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install -r requirements.txt
cp .env.example .env
python main.py --questions 5 --seconds 20
```

## Config (env vars)
Add to `.env` (or export) as needed:

- `OPENAI_API_KEY`, `OPENAI_MODEL_NAME`
- `HF_MODEL_NAME`, `HF_DEVICE`
- `WHISPER_MODEL`, `WHISPER_DEVICE`, `WHISPER_VAD=1`, `WHISPER_CHUNK_SECONDS=0`
- `INTERVIEW_ROLE`, `INTERVIEW_LEVEL`
- `SUMMARIZE_AFTER`, `SUMMARY_KEEP_LAST`
- `TTS_CACHE_DIR`, `SESSION_LOG_PATH`
- `USE_CREWAI=1`

## Where CrewAI fits
CrewAI is great for **reasoning and decision-making** (questioning, evaluating, coaching).
Your encoder/decoder are better treated as **tools/modules** that agents can call when needed.

If you want full voice UX, plug `pipeline.py` into Gradio/Streamlit/Web UI.
