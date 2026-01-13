from __future__ import annotations
from crewai import Task
from .schemas import EvaluationResult

def make_question_task(agent, q_num: int, total_q: int, role: str, level: str, history_text: str):
    return Task(
        description=(
            f"أنت في سؤال رقم {q_num} من {total_q}. "
            f"الدور: {role}. المستوى: {level}.\n\n"
            f"تاريخ الأسئلة/الإجابات السابقة (قد يكون مختصر):\n{history_text}\n\n"
            "اكتب سؤال مقابلة واحد فقط (سطر واحد)، بدون إجابة أو تعداد."
        ),
        expected_output="سؤال واحد فقط بالعربية.",
        agent=agent,
    )

def make_safety_task(agent, *, context_tasks):
    return Task(
        description="راجع مخرجات السياق للسلامة والخصوصية. أجب بـ OK أو BLOCKED: <reason>.",
        expected_output="OK أو BLOCKED: <reason>",
        agent=agent,
        context=context_tasks,
    )

def make_eval_task(agent, *, answer_text: str, role: str, level: str, context_tasks=None, question_text: str | None = None):
    question_line = f"السؤال: {question_text}\n" if question_text else ""
    return Task(
        description=(
            f"قيّم إجابة المرشح عن سؤال المقابلة.\n"
            f"{question_line}"
            f"الدور: {role}\nالمستوى: {level}\n"
            f"الإجابة: {answer_text}\n\n"
            "أخرج JSON فقط بالشكل المحدد."
        ),
        expected_output='JSON: {"score":0-10,"strengths":[...],"gaps":[...],"better_answer":"...","followup_question":"..."}',
        agent=agent,
        context=context_tasks or [],
        output_json=EvaluationResult,  # let CrewAI structure/validate JSON
    )

def make_coach_task(agent, *, context_tasks):
    return Task(
        description="حوّل تقييم المُقيّم (JSON في السياق) إلى Coaching عملي + سؤال متابعة واحد.",
        expected_output="Coaching + سؤال متابعة.",
        agent=agent,
        context=context_tasks,
    )
