import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import EssayInput from "./EssayInput";

export default function InterviewQuiz({ quizData, currentQuestion, onNext }) {
  const [answerType, setAnswerType] = useState("voice");
  const [voiceAnswer, setVoiceAnswer] = useState(null);
  const [essayText, setEssayText] = useState("");

  const isAnswered = answerType === "voice"
    ? !!voiceAnswer
    : essayText.trim() !== "";

  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  const isLast = currentQuestion === quizData.length - 1;

  // الـ API بيرجع questionText مش question
  const currentQ = quizData[currentQuestion];
  const questionText = currentQ?.questionText || currentQ?.question || "";

  const handleNext = () => {
    const answer = answerType === "voice"
      ? { type: "voice", data: voiceAnswer?.data }
      : { type: "essay", data: essayText };

    onNext(answer);

    setAnswerType("voice");
    setVoiceAnswer(null);
    setEssayText("");
  };

  return (
    <div className="quiz-int-wrapper">

      <div className="quiz-int-prog-bg">
        <div className="quiz-int-prog-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-int-header-row">
        <span className="quiz-int-tag">Open Ended</span>
        <span className="quiz-int-counter">
          Question {currentQuestion + 1} of {quizData.length}
        </span>
      </div>

      <div className="quiz-int-question-text">
        {questionText}
      </div>

      <div className="quiz-int-toggle-group">
        <button
          className={`quiz-int-toggle-btn ${answerType === "voice" ? "quiz-int-toggle-btn-active" : ""}`}
          onClick={() => setAnswerType("voice")}
        >Voice Answer</button>
        <button
          className={`quiz-int-toggle-btn ${answerType === "essay" ? "quiz-int-toggle-btn-active" : ""}`}
          onClick={() => setAnswerType("essay")}
        >Written Answer</button>
      </div>

      {answerType === "voice"
        ? <VoiceRecorder key={currentQuestion} onAnswer={setVoiceAnswer} />
        : <EssayInput value={essayText} onChange={setEssayText} />
      }

      <button
        className="quiz-int-next-btn"
        onClick={handleNext}
        disabled={!isAnswered}
      >
        {isLast ? "Finish Quiz" : "Next"}
      </button>

    </div>
  );
}
