from __future__ import annotations
import re
from datetime import datetime, timezone

_EMAIL_RE = re.compile(r"\b[\w\.-]+@[\w\.-]+\.\w+\b")
_PHONE_RE = re.compile(r"\b(?:\+?\d{1,3}[-.\s]?)?(?:\d{2,4}[-.\s]?){2,4}\d{2,4}\b")

def redact_pii(text: str) -> str:
    text = _EMAIL_RE.sub("[REDACTED_EMAIL]", text)
    text = _PHONE_RE.sub("[REDACTED_PHONE]", text)
    return text

def simple_safety_check(text: str) -> str:
    lowered = text.lower()
    if any(k in lowered for k in ["religion", "politics", "sexual", "ssn", "passport", "address"]):
        return "BLOCKED: sensitive topic"
    return "OK"

def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
