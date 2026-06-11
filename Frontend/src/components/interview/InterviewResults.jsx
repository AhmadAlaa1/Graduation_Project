import { useTranslation } from "react-i18next";

export default function InterviewResults({ quizData, evaluations, onRestart }) {
  const { t } = useTranslation();
  const evalList = Array.isArray(evaluations) ? evaluations : [];

  const getScoreColor = (score) => {
    if (score >= 9) return "#2E8B73";   // Dark Green
    if (score >= 7.5) return "#4CAF50"; // Light Green
    if (score >= 6) return "#F4D03F";   // Yellow/Gold
    if (score >= 4) return "#F28C28";   // Orange
    return "#e05c5c";                   // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return t('interview_results.score_labels.excellent');
    if (score >= 7.5) return t('interview_results.score_labels.very_good');
    if (score >= 6) return t('interview_results.score_labels.good');
    if (score >= 4) return t('interview_results.score_labels.fair');
    return t('interview_results.score_labels.needs_improvement');
  };

  const avgScore = evalList.length > 0
    ? (evalList.reduce((sum, e) => sum + (e.score || 0), 0) / evalList.length).toFixed(1)
    : null;

  return (
    <div className="quiz-res-wrapper">

      {/* Header */}
      <div className="quiz-res-top text-center mb-5">
        <h1 className="quiz-res-title">{t('interview_results.title')}</h1>
        <p className="quiz-res-subtitle">{t('interview_results.subtitle')}</p>

        {/* Overall Score */}
        {avgScore && (
          <div className="quiz-res-overall" style={{ borderColor: getScoreColor(avgScore) }}>
            <span className="quiz-res-overall-label">{t('interview_results.overall_score_label')}</span>
            <span className="quiz-res-overall-score" style={{ color: getScoreColor(avgScore) }}>
              {avgScore} {t('interview_results.score_out_of')}
            </span>
            <span className="quiz-res-overall-tag" style={{ background: getScoreColor(avgScore) }}>
              {getScoreLabel(avgScore)}
            </span>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="quiz-res-list">
        {quizData.map((q, i) => {
          const evalItem = evalList[i];
          const questionText = q?.questionText || q?.question || "";
          const score = evalItem?.score;

          return (
            <div key={i} className="quiz-res-card">

              {/* Question Header */}
              <div className="quiz-res-card-header">
                <div className="quiz-res-q-info">
                  <span className="quiz-res-q-num">Q{i + 1}</span>
                  <span className="quiz-res-q-text">{questionText}</span>
                </div>
                {score !== undefined && (
                  <div
                    className="quiz-res-score-pill"
                    style={{
                      background: getScoreColor(score) + "20",
                      color: getScoreColor(score),
                      border: `1px solid ${getScoreColor(score)}40`,
                    }}
                  >
                    {score} {t('interview_results.score_out_of')}
                  </div>
                )}
              </div>

              {evalItem ? (
                <div className="quiz-res-card-body">

                  {/* Feedback */}
                  {evalItem.feedback && (
                    <div className="quiz-res-block quiz-res-block-feedback">
                      <div className="quiz-res-block-title">
                        <i className="fa-solid fa-comment-dots"></i> {t('interview_results.feedback_title')}
                      </div>
                      <p>{evalItem.feedback}</p>
                    </div>
                  )}

                  <div className="quiz-res-two-col">

                    {/* Strengths */}
                    {evalItem.strengths?.length > 0 && (
                      <div className="quiz-res-block quiz-res-block-strengths">
                        <div className="quiz-res-block-title quiz-res-green">
                          <i className="fa-solid fa-circle-check"></i> {t('interview_results.strengths_title')}
                        </div>
                        <ul>
                          {evalItem.strengths.map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Gaps */}
                    {evalItem.gaps?.length > 0 && (
                      <div className="quiz-res-block quiz-res-block-gaps">
                        <div className="quiz-res-block-title quiz-res-orange">
                          <i className="fa-solid fa-triangle-exclamation"></i> {t('interview_results.gaps_title')}
                        </div>
                        <ul>
                          {evalItem.gaps.map((g, j) => (
                            <li key={j}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                  {/* Better Answer */}
                  {evalItem.better_answer && (
                    <div className="quiz-res-block quiz-res-block-better">
                      <div className="quiz-res-block-title quiz-res-blue">
                        <i className="fa-solid fa-lightbulb"></i> {t('interview_results.better_answer_title')}
                      </div>
                      <p>{evalItem.better_answer}</p>
                    </div>
                  )}

                  {/* Follow-up Question */}
                  {evalItem.followup_question && (
                    <div className="quiz-res-block quiz-res-block-followup">
                      <div className="quiz-res-block-title quiz-res-purple">
                        <i className="fa-solid fa-rotate-right"></i> {t('interview_results.followup_title')}
                      </div>
                      <p>{evalItem.followup_question}</p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="quiz-res-no-eval">{t('interview_results.no_eval')}</div>
              )}

            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="quiz-res-actions">
        <button className="quiz-res-btn-secondary" onClick={onRestart}>
          <i className="fa-solid fa-rotate-left"></i> {t('interview_results.btn_restart')}
        </button>
        <a href="/" className="quiz-res-btn-primary">
          <i className="fa-solid fa-house"></i> {t('interview_results.btn_home')}
        </a>
      </div>

    </div>
  );
}