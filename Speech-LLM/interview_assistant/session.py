from __future__ import annotations
from dataclasses import dataclass, field
from typing import List, Dict, Any
from .schemas import QAItem

@dataclass
class StepMetric:
    name: str
    seconds: float
    meta: Dict[str, Any] = field(default_factory=dict)

@dataclass
class Session:
    history: List[QAItem] = field(default_factory=list)
    summary: str = ""
    metrics: List[StepMetric] = field(default_factory=list)

    def add(self, question: str, answer_text: str, feedback: str, score: float | None = None, tags=None):
        self.history.append(QAItem(question=question, answer_text=answer_text, feedback=feedback, score=score, tags=tags or []))

    def add_metric(self, name: str, seconds: float, meta: Dict[str, Any] | None = None):
        self.metrics.append(StepMetric(name=name, seconds=seconds, meta=meta or {}))

    def history_text(self, keep_last: int = 2) -> str:
        items = self.history[-keep_last:] if keep_last > 0 else self.history
        lines = []
        if self.summary:
            lines.append(f"ملخص سابق: {self.summary}")
        for item in items:
            lines.append(f"س: {item.question}\nج: {item.answer_text}")
        return "\n".join(lines).strip()
