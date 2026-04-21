import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import InterviewHome from "../components/interview/InterviewHome";
import InterviewQuiz from "../components/interview/InterviewQuiz";
import InterviewResults from "../components/interview/InterviewResults";
import { useInterview } from "../hooks/useInterview";

export default function InterviewPage() {
  const [page, setPage] = useState("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // ✅ بنخزن الإجابات في useRef عشان مش serializable في Redux
  const answersRef = useRef([]);

  const {
    questions,
    evaluations,
    loading,
    error,
    start,
    finish,
    reset,
  } = useInterview();

  // ===== Start =====
  const handleStart = async () => {
    answersRef.current = [];
    const success = await start();
    if (success) {
      setPage("quiz");
      setCurrentQuestion(0);
    }
  };

  // ===== Next Question =====
  const handleNext = async (answer) => {
    // بنحفظ الإجابة في الـ ref مش في Redux
    answersRef.current[currentQuestion] = answer;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      // آخر سؤال → بنبعت للـ API
      const success = await finish(answersRef.current);
      if (success) setPage("results");
    }
  };

  // ===== Restart =====
  const handleRestart = () => {
    reset();
    answersRef.current = [];
    setPage("home");
    setCurrentQuestion(0);
  };

  return (
    <>
      <Navbar />
      <div className="interview-container min-vh-100 d-flex align-items-center justify-content-center">

        {loading && (
          <div className="text-center">
            <div className="spinner-border" style={{ color: "var(--primary)" }} />
            <p className="mt-3">Please wait...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            <p className="text-danger">{error}</p>
            <button className="btn mt-2" onClick={handleRestart}>Try Again</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {page === "home" && (
              <InterviewHome onStart={handleStart} />
            )}
            {page === "quiz" && questions.length > 0 && (
              <InterviewQuiz
                quizData={questions}
                currentQuestion={currentQuestion}
                onNext={handleNext}
              />
            )}
            {page === "results" && (
              <InterviewResults
                quizData={questions}
                evaluations={evaluations}
                onRestart={handleRestart}
              />
            )}
          </>
        )}

      </div>
    </>
  );
}
