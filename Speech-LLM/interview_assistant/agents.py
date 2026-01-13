from __future__ import annotations
from crewai import Agent
from .prompts import INTERVIEWER_SYSTEM, EVALUATOR_SYSTEM, COACH_SYSTEM, SAFETY_SYSTEM

def build_agents(llm=None):
    interviewer = Agent(
        role="Interviewer",
        goal="Ask great, role-appropriate interview questions in Arabic",
        backstory="Senior software engineer who runs structured interviews.",
        llm=llm,
        verbose=True,
        memory=True,
        respect_context_window=True,
        system_template=INTERVIEWER_SYSTEM,
    )

    evaluator = Agent(
        role="Evaluator",
        goal="Score answers and produce structured JSON feedback",
        backstory="Hiring manager focused on fair, actionable feedback.",
        llm=llm,
        verbose=True,
        memory=True,
        respect_context_window=True,
        system_template=EVALUATOR_SYSTEM,
    )

    coach = Agent(
        role="Coach",
        goal="Turn evaluation JSON into helpful coaching + follow-up question",
        backstory="Interview coach who helps candidates level up quickly.",
        llm=llm,
        verbose=True,
        memory=True,
        respect_context_window=True,
        system_template=COACH_SYSTEM,
    )

    safety = Agent(
        role="Safety Reviewer",
        goal="Block unsafe or overly personal content",
        backstory="Policy and safety reviewer to keep the interview appropriate.",
        llm=llm,
        verbose=True,
        memory=False,
        system_template=SAFETY_SYSTEM,
    )

    return interviewer, evaluator, coach, safety
