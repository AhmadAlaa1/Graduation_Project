import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import InterviewHome from "../components/interview/InterviewHome";
import InterviewQuiz from "../components/interview/InterviewQuiz";
import InterviewResults from "../components/interview/InterviewResults";
import { useInterview } from "../hooks/useInterview";
import { useTranslation } from "react-i18next";

export default function InterviewPage() {
  const [page, setPage] = useState("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const answersRef = useRef([]);
  const { t } = useTranslation();

  const {
    questions,
    evaluations,
    loading,
    error,
    start,
    startWithJob,
    finish,
    reset,
    clearErr,
  } = useInterview();

  const handleStart = async () => {
    clearErr();
    answersRef.current = [];
    const success = await start();
    if (success) {
      setPage("quiz");
      setCurrentQuestion(0);
    }
  };

  const handleStartWithJob = async ({ role, level }) => {
    clearErr();
    answersRef.current = [];
    const success = await startWithJob({ role, level });
    if (success) {
      setPage("quiz");
      setCurrentQuestion(0);
    }
  };

  const handleNext = async (answer) => {
    answersRef.current[currentQuestion] = answer;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      const success = await finish(answersRef.current);
      if (success) setPage("results");
    }
  };

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
            <p className="mt-3">{t('interview_page.loading_text')}</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            <p className="text-danger">{error}</p>
            <button className="btn quiz-intro-btn-brand rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center justify-content-center gap-2 shadow-sm " onClick={handleRestart}>{t('interview_page.btn_retry')}</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {page === "home" && <InterviewHome onStart={handleStart} onStartWithJob={handleStartWithJob} />}
            {page === "quiz" && questions.length > 0 && <InterviewQuiz quizData={questions} currentQuestion={currentQuestion} onNext={handleNext} />}
            {page === "results" && <InterviewResults quizData={questions} evaluations={evaluations} onRestart={handleRestart} />}
          </>
        )}
      </div>
    </>
  );
}