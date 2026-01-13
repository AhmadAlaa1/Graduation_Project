import argparse
from interview_assistant.config import Settings
from interview_assistant.pipeline import run_cli_interview

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--questions", type=int, default=5)
    ap.add_argument("--seconds", type=int, default=20)
    args = ap.parse_args()

    settings = Settings()
    run_cli_interview(settings, num_questions=args.questions, answer_seconds=args.seconds)

if __name__ == "__main__":
    main()
