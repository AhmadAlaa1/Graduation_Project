import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useInterview } from "../hooks/useInterview";
import InterviewDetails from "../components/InterviewDetails";
import { getInterviewDetailsApi } from "../api/interviewApi";

// ===== helpers =====
const getSessionTitle = (createdAt, index, allDates) => {
  const date = new Date(createdAt);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // عد كم session في نفس اليوم ده
  const sameDay = allDates
    .slice(0, index + 1)
    .filter(d => new Date(d).toDateString() === date.toDateString());

  return `${dateStr} · Session ${sameDay.length}`;
};

const calcAvgScore = (details) => {
  const questions = details?.questions || [];
  if (!questions.length) return null;
  const total = questions.reduce((sum, q) => sum + (q.evaluationDto?.score || 0), 0);
  return (total / questions.length).toFixed(1);
};

// تم تعديل دالة الألوان لتتناسب مع التقييم من 10 (5 مستويات)
const getScoreColor = (score) => {
  if (!score && score !== 0) return "#aaa";
  if (score >= 9) return "#2E8B73";   // Excellent
  if (score >= 7.5) return "#4CAF50"; // Very Good
  if (score >= 6) return "#F4D03F";   // Good
  if (score >= 4) return "#F28C28";   // Fair
  return "#e05c5c";                   // Needs Improvement
};

export default function MyInterviewsPage() {
  const { history, details, loading, error, fetchHistory, fetchDetails } = useInterview();
  const [selectedId, setSelectedId] = useState(null);
  const [scores, setScores] = useState({});
  const [scoresLoading, setScoresLoading] = useState(false);

  // جيب الـ history أول ما الصفحة تفتح
  useEffect(() => {
    fetchHistory();
  }, []);

  // لما الـ history تتحمل جيب الـ scores بـ parallel
  useEffect(() => {
    if (!history?.length) return;

    const loadScores = async () => {
      setScoresLoading(true);
      try {
        // كل الـ requests بتحصل في نفس الوقت
        const results = await Promise.all(
          history.map(item => getInterviewDetailsApi(item.id).catch(() => null))
        );

        const scoresMap = {};
        results.forEach((detail, i) => {
          if (detail) {
            scoresMap[history[i].id] = calcAvgScore(detail);
          }
        });
        setScores(scoresMap);
      } catch {
        // لو فيه error مش هيأثر على الصفحة
      } finally {
        setScoresLoading(false);
      }
    };

    loadScores();
  }, [history]);

  const handleSelect = (id) => {
    setSelectedId(id);
    fetchDetails(id);
  };

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
              <p>Loading your interviews...</p>
            </div>
          )}

          {error && !loading && (
            <div className="myi-error">
              <p>{error}</p>
              <button className="myi-btn-primary" onClick={fetchHistory}>Try Again</button>
            </div>
          )}

          {/* Details View */}
          {selectedId && !loading && details && (
            <InterviewDetails details={details} onBack={handleBack} />
          )}

          {/* History List */}
          {!selectedId && !loading && !error && (
            <>
              <div className="myi-header">
                <h1 className="myi-title">My Interviews</h1>
                <p className="myi-subtitle">Review your past interview sessions and feedback</p>
              </div>

              {history?.length === 0 ? (
                <div className="myi-empty">
                  <i className="fa-solid fa-clipboard-question myi-empty-icon"></i>
                  <p>No interviews yet</p>
                  <a href="/interview" className="myi-btn-primary">Start Your First Interview</a>
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

                          <div>
                            <div className="myi-card-title">{title}</div>
                            <div className="myi-card-meta">
                              <i className="fa-solid fa-circle-question me-1"></i>
                              {item.questionsCount} Questions
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Score & Arrow */}
                        <div className="myi-card-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                          <div
                            className="myi-score-circle"
                            style={{
                              borderColor: getScoreColor(score),
                              backgroundColor: score !== null ? `${getScoreColor(score)}15` : 'transparent'
                            }}
                          >
                            {scoresLoading ? (
                              <div className="myi-score-spinner" />
                            ) : score !== null ? (
                              <>
                                <span className="myi-score-val" style={{ color: getScoreColor(score) }}>
                                  {score}
                                </span>
                                <span className="myi-score-out">/10</span>
                              </>
                            ) : (
                              <span className="myi-score-na">—</span>
                            )}
                          </div>

                          <div className="myi-card-arrow">
                            <i className="fa-solid fa-chevron-right"></i>
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