import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useInterview } from "../hooks/useInterview";
import InterviewDetails from "../components/InterviewDetails";
import { getInterviewDetailsApi } from "../api/interviewApi";
import { useTranslation } from "react-i18next";

export default function MyInterviewsPage() {
  const { history, details, loading, error, fetchHistory, fetchDetails } = useInterview();
  const [selectedId, setSelectedId] = useState(null);
  const [scores, setScores] = useState({});
  const [scoresLoading, setScoresLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const getSessionTitle = (createdAt, index, allDates) => {
    const date = new Date(createdAt);
    const dateStr = date.toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { month: "short", day: "numeric" });
    const sameDay = allDates.slice(0, index + 1).filter(d => new Date(d).toDateString() === date.toDateString());
    return `${dateStr} - ${t('my_interviews.session_label')} ${sameDay.length}`;
  };

  const calcAvgScore = (details) => {
    const questions = details?.questions || [];
    if (!questions.length) return null;
    const total = questions.reduce((sum, q) => sum + (q.evaluationDto?.score || 0), 0);
    return (total / questions.length).toFixed(1);
  };

  const getScoreColor = (score) => {
    if (!score && score !== 0) return "#aaa";
    if (score >= 9) return "#2E8B73";   
    if (score >= 7.5) return "#4CAF50"; 
    if (score >= 6) return "#F4D03F";   
    if (score >= 4) return "#F28C28";   
    return "#e05c5c";                   
  };

  useEffect(() => { fetchHistory(); }, []);

  useEffect(() => {
    if (!history?.length) return;
    const loadScores = async () => {
      setScoresLoading(true);
      try {
        const results = await Promise.all(history.map(item => getInterviewDetailsApi(item.id).catch(() => null)));
        const scoresMap = {};
        results.forEach((detail, i) => { if (detail) scoresMap[history[i].id] = calcAvgScore(detail); });
        setScores(scoresMap);
      } catch {} finally { setScoresLoading(false); }
    };
    loadScores();
  }, [history]);

  const handleSelect = (id) => { setSelectedId(id); fetchDetails(id); };
  const handleBack = () => setSelectedId(null);
  const dates = history?.map(item => item.createdAt) || [];

  return (
    <>
      <Navbar />
      <div className="myi-page">
        <div className="inter-background container">
          {loading && (
            <div className="myi-loading">
              <div className="spinner-border" style={{ color: "var(--g1)" }} />
              <p>{t('my_interviews.loading_text')}</p>
            </div>
          )}

          {error && !loading && (
            <div className="myi-error">
              <p>{error}</p>
              <button className="myi-btn-primary" onClick={fetchHistory}>{t('my_interviews.btn_retry')}</button>
            </div>
          )}

          {selectedId && !loading && details && <InterviewDetails details={details} onBack={handleBack} />}

          {!selectedId && !loading && !error && (
            <>
              <div className="myi-header">
                <h1 className="myi-title">{t('my_interviews.page_title')}</h1>
                <p className="myi-subtitle">{t('my_interviews.page_subtitle')}</p>
              </div>

              {history?.length === 0 ? (
                <div className="myi-empty">
                  <i className="fa-solid fa-clipboard-question myi-empty-icon"></i>
                  <p>{t('my_interviews.empty_msg')}</p>
                  <a href="/interview" className="myi-btn-primary">{t('my_interviews.btn_start_first')}</a>
                </div>
              ) : (
                <div className="myi-grid">
                  {history?.map((item, i) => {
                    const score = scores[item.id];
                    const title = getSessionTitle(item.createdAt, i, dates);
                    return (
                      <div key={item.id} className="myi-card" onClick={() => handleSelect(item.id)}>
                        <div className="myi-card-left">
                          <div className="myi-card-num">{i + 1}</div>
                          <div style={{ marginInlineStart: 20 }}>
                            <div className="myi-card-title">{title}</div>
                            <div className="myi-card-meta">
                              <i className="fa-solid fa-circle-question me-1"></i>
                              {t('my_interviews.questions_count', { count: item.questionsCount })}
                            </div>
                          </div>
                        </div>
                        <div className="myi-card-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div className="myi-score-circle" style={{ borderColor: getScoreColor(score), backgroundColor: score !== null ? `${getScoreColor(score)}15` : 'transparent' }}>
                            {scoresLoading ? <div className="myi-score-spinner" /> : score !== null ? <><span className="myi-score-val" style={{ color: getScoreColor(score) }}>{score}</span><span className="myi-score-out">{t('my_interviews.score_out_of')}</span></> : <span className="myi-score-na">{t('my_interviews.score_na')}</span>}
                          </div>
                          <div className="myi-card-arrow">
                            <i className={`fa-solid ${i18n.language === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}