from __future__ import annotations
from dataclasses import dataclass
import hashlib
from pathlib import Path
from gtts import gTTS

@dataclass
class GTTSDecoder:
    lang: str = "ar"
    cache_dir: str | None = None

    def speak_to_file(self, text: str, out_path: str) -> str:
        if self.cache_dir:
            cache_root = Path(self.cache_dir)
            cache_root.mkdir(parents=True, exist_ok=True)
            digest = hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]
            out_path = str(cache_root / f"tts_{digest}.mp3")
        elif out_path:
            Path(out_path).parent.mkdir(parents=True, exist_ok=True)

        if out_path and Path(out_path).exists():
            return out_path

        tts = gTTS(text=text, lang=self.lang)
        tts.save(out_path)
        return out_path
