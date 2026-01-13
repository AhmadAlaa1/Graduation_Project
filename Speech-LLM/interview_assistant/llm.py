from __future__ import annotations
from dataclasses import dataclass
from typing import List, Dict, Optional, Type
import json
import os

@dataclass
class LLMClient:
    """Small wrapper so you can swap OpenAI / local HF later."""
    openai_api_key: Optional[str] = None
    openai_model: str = "gpt-4o-mini"
    hf_model_name: Optional[str] = None
    hf_device: str = "auto"

    def chat(self, messages: List[Dict[str, str]]) -> str:
        if self.openai_api_key:
            return self._chat_openai(messages)
        if self.hf_model_name:
            return self._chat_hf(messages)
        raise RuntimeError("No LLM configured. Set OPENAI_API_KEY or HF_MODEL_NAME in .env")

    def _chat_openai(self, messages: List[Dict[str, str]]) -> str:
        # Avoid importing openai unless needed
        from openai import OpenAI
        client = OpenAI(api_key=self.openai_api_key)
        resp = client.chat.completions.create(
            model=self.openai_model,
            messages=messages,
            temperature=0.7,
        )
        return resp.choices[0].message.content.strip()

    def _chat_hf(self, messages: List[Dict[str, str]]) -> str:
        # Minimal local fallback (no streaming)
        from transformers import AutoTokenizer, AutoModelForCausalLM
        import torch

        tok = AutoTokenizer.from_pretrained(self.hf_model_name)
        model = AutoModelForCausalLM.from_pretrained(self.hf_model_name, device_map=self.hf_device)
        prompt = "\n".join([f"{m['role']}: {m['content']}" for m in messages]) + "\nassistant:"
        inputs = tok(prompt, return_tensors="pt").to(model.device)
        with torch.no_grad():
            out = model.generate(**inputs, max_new_tokens=256, do_sample=True, top_p=0.9, temperature=0.7)
        text = tok.decode(out[0], skip_special_tokens=True)
        return text.split("assistant:")[-1].strip()

    def chat_json(self, messages: List[Dict[str, str]], schema: Type) -> object:
        text = self.chat(messages)
        payload = _extract_json(text)
        return schema.model_validate(payload)

def _extract_json(text: str) -> object:
    text = text.strip()
    if text.startswith("```"):
        text = text.strip("`")
        parts = text.split("\n", 1)
        text = parts[1] if len(parts) > 1 else parts[0]
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            return json.loads(text[start:end + 1])
        raise
