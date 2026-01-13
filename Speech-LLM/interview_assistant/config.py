from __future__ import annotations
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    # Languages
    language: str = os.getenv("LANGUAGE", "ar")
    tts_lang: str = os.getenv("TTS_LANG", "ar")

    # OpenAI (optional)
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY") or None
    openai_model_name: str = os.getenv("OPENAI_MODEL_NAME", "gpt-4o-mini")

    # Local HF (optional)
    hf_model_name: str | None = os.getenv("HF_MODEL_NAME") or None
    hf_device: str = os.getenv("HF_DEVICE", "auto")

    # Whisper
    whisper_model: str = os.getenv("WHISPER_MODEL", "small")
    whisper_device: str = os.getenv("WHISPER_DEVICE", "auto")
    whisper_vad: bool = os.getenv("WHISPER_VAD", "1") == "1"
    whisper_vad_threshold: float = float(os.getenv("WHISPER_VAD_THRESHOLD", "0.01"))
    whisper_chunk_seconds: int = int(os.getenv("WHISPER_CHUNK_SECONDS", "0"))

    # Interview state
    role: str = os.getenv("INTERVIEW_ROLE", "Software Engineering")
    level: str = os.getenv("INTERVIEW_LEVEL", "junior")

    # Summarization / context control
    summarize_after: int = int(os.getenv("SUMMARIZE_AFTER", "4"))
    summary_keep_last: int = int(os.getenv("SUMMARY_KEEP_LAST", "2"))

    # TTS
    tts_cache_dir: str = os.getenv("TTS_CACHE_DIR", ".tts_cache")

    # Logging / orchestration
    session_log_path: str = os.getenv("SESSION_LOG_PATH", "session_log.json")
    use_crewai: bool = os.getenv("USE_CREWAI", "0") == "1"
