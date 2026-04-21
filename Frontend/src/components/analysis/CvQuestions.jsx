export default function CvQuestions({ questions }) {
  if (!questions?.length) return null;

  return (
    <div className="an-card mb-4">
      <h5 className="an-card-title">
        <i className="fas fa-comments me-2"></i>Suggested Interview Questions
      </h5>
      <ul className="an-questions-list">
        {questions.map((q, i) => (
          <li key={i} className="an-question-item">
            <span className="an-q-num">{i + 1}</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
