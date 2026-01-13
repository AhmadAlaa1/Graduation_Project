from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, List
import numpy as np
import whisper

def _resolve_device(device: str) -> str:
    if device != "auto":
        return device
    try:
        import torch
        return "cuda" if torch.cuda.is_available() else "cpu"
    except Exception:
        return "cpu"

def _trim_silence(audio: np.ndarray, threshold: float) -> np.ndarray:
    if audio.size == 0:
        return audio
    energy = np.abs(audio)
    mask = energy > threshold
    if not mask.any():
        return audio
    start = int(np.argmax(mask))
    end = int(len(audio) - np.argmax(mask[::-1]))
    return audio[start:end]

def _chunk_audio(audio: np.ndarray, chunk_samples: int) -> Iterable[np.ndarray]:
    if chunk_samples <= 0 or len(audio) <= chunk_samples:
        yield audio
        return
    for i in range(0, len(audio), chunk_samples):
        yield audio[i:i + chunk_samples]

@dataclass
class WhisperEncoder:
    model_name: str = "small"
    device: str = "auto"
    language: str = "ar"
    use_vad: bool = True
    vad_threshold: float = 0.01
    chunk_seconds: int = 0

    def __post_init__(self):
        self.device = _resolve_device(self.device)
        self.model = whisper.load_model(self.model_name, device=self.device)

    def transcribe(self, audio_path: str) -> str:
        audio = whisper.load_audio(audio_path)
        if self.use_vad:
            audio = _trim_silence(audio, threshold=self.vad_threshold)
        if audio.size == 0:
            return ""
        chunk_samples = int(self.chunk_seconds * whisper.audio.SAMPLE_RATE)
        texts: List[str] = []
        for chunk in _chunk_audio(audio, chunk_samples):
            result = self.model.transcribe(
                chunk,
                language=self.language,
                fp16=False if self.device == "cpu" else True,
            )
            texts.append((result.get("text") or "").strip())
        return " ".join([t for t in texts if t]).strip()
