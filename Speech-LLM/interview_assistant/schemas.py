from __future__ import annotations
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class EvaluationResult(BaseModel):
    score: float = Field(ge=0, le=10)
    strengths: List[str] = Field(default_factory=list)
    gaps: List[str] = Field(default_factory=list)
    better_answer: str
    followup_question: str

class QAItem(BaseModel):
    question: str
    answer_text: str
    feedback: str
    score: Optional[float] = None
    tags: List[str] = Field(default_factory=list)

class InterviewState(BaseModel):
    role: str = "Software Engineering"
    level: Literal["intern", "junior", "mid", "senior"] = "junior"
    q_num: int = 0
    total_q: int = 0
    history: List[QAItem] = Field(default_factory=list)
