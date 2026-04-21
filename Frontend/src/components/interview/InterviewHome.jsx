export default function InterviewHome({ onStart }) {
  return (
    <div className="quiz-intro-wrapper bg-white rounded-4 p-5 text-center mx-auto">
      <div className="mb-4">
        <span className="badge bg-light quiz-intro-text-brand px-3 py-2 rounded-pill fw-medium border border-light">
          <i className="fa-solid fa-clipboard-question me-2"></i>
          Interview Stage
        </span>
      </div>

      <h1 className="fw-bold text-dark mb-3">Interview Quiz</h1>

      <p className="text-secondary mb-5 fs-5">
        Click Start to load your personalized interview questions.
      </p>

      <button
        className="btn quiz-intro-btn-brand rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center justify-content-center gap-2 shadow-sm quiz-intro-start-btn w-100"
        onClick={onStart}
      >
        Start Quiz
        <i className="fa-solid fa-arrow-right mt-1"></i>
      </button>
    </div>
  );
}
