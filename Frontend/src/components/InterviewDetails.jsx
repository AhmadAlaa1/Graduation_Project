export default function InterviewDetails({ details, onBack }) {
  if (!details) return null;

  const questions = details.questions || [];

const getScoreColor = (score) => {
  if (!score && score !== 0) return "#aaa";
  if (score >= 9) return "#2E8B73";   // Excellent
  if (score >= 7.5) return "#4CAF50"; // Very Good
  if (score >= 6) return "#F4D03F";   // Good
  if (score >= 4) return "#F28C28";   // Fair
  return "#e05c5c";                   // Needs Improvement
};

  const avgScore = questions.length > 0
    ? (questions.reduce((sum, q) => sum + (q.evaluationDto?.score || 0), 0) / questions.length).toFixed(1)
    : null;

  return (
    <div className="mid-wrapper">

      {/* Back */}
      <button className="mid-back-btn" onClick={onBack}>
        <i className="fa-solid fa-arrow-left me-2"></i>Back to History
      </button>

      {/* Header */}
      <div className="mid-header">
        <h2 className="mid-title">Interview Details</h2>
        {avgScore && (
          <div className="mid-avg-score" style={{ borderColor: getScoreColor(avgScore) }}>
            <span className="mid-avg-label">Avg Score</span>
            <span className="mid-avg-val" style={{ color: getScoreColor(avgScore) }}>
              {avgScore} / 10
            </span>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="mid-questions">
        {questions.map((q, i) => {
          const eval_ = q.evaluationDto;
          const score = eval_?.score;

          return (
            <div key={i} className="mid-card">

              {/* Question Header */}
              <div className="mid-card-header">
                <div className="mid-q-info">
                  <span className="mid-q-num">Q{i + 1}</span>
                  <span className="mid-q-text">{q.questionText}</span>
                </div>
                {score !== undefined && (
                  <div className="mid-score-pill"
                    style={{
                      background: getScoreColor(score) + "20",
                      color: getScoreColor(score),
                      border: `1px solid ${getScoreColor(score)}40`,
                    }}
                  >
                    {score} / 10
                  </div>
                )}
              </div>

              <div className="mid-card-body">

                {/* Answer */}
                {(q.answerText || q.answerAudio) && (
                  <div className="mid-block mid-block-answer">
                    <div className="mid-block-title">
                      <i className="fa-solid fa-user me-1"></i> Your Answer
                    </div>
                    {q.answerText && <p>{q.answerText}</p>}
                    {q.answerAudio && (
                      <audio controls src={q.answerAudio} className="mid-audio" />
                    )}
                  </div>
                )}

                {eval_ && (
                  <>
                    {/* Feedback */}
                    {eval_.feedback && (
                      <div className="mid-block mid-block-feedback">
                        <div className="mid-block-title mid-teal">
                          <i className="fa-solid fa-comment-dots me-1"></i> Feedback
                        </div>
                        <p>{eval_.feedback}</p>
                      </div>
                    )}

                    <div className="mid-two-col">
                      {/* Strengths */}
                      {eval_.strengths?.length > 0 && (
                        <div className="mid-block mid-block-strengths">
                          <div className="mid-block-title mid-green">
                            <i className="fa-solid fa-circle-check me-1"></i> Strengths
                          </div>
                          <ul>
                            {eval_.strengths.map((s, j) => <li key={j}>{s}</li>)}
                          </ul>
                        </div>
                      )}

                      {/* Gaps */}
                      {eval_.gaps?.length > 0 && (
                        <div className="mid-block mid-block-gaps">
                          <div className="mid-block-title mid-orange">
                            <i className="fa-solid fa-triangle-exclamation me-1"></i> Areas to Improve
                          </div>
                          <ul>
                            {eval_.gaps.map((g, j) => <li key={j}>{g}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Better Answer */}
                    {eval_.better_answer && (
                      <div className="mid-block mid-block-better">
                        <div className="mid-block-title mid-blue">
                          <i className="fa-solid fa-lightbulb me-1"></i> Better Answer
                        </div>
                        <p>{eval_.better_answer}</p>
                      </div>
                    )}

                    {/* Follow-up */}
                    {eval_.followup_question && (
                      <div className="mid-block mid-block-followup">
                        <div className="mid-block-title mid-purple">
                          <i className="fa-solid fa-rotate-right me-1"></i> Follow-up Question
                        </div>
                        <p>{eval_.followup_question}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
