import { useNavigate } from "react-router-dom";

const featuresCards = [
  { key: "aiInterview",          icon: "fas fa-robot",        title: "AI Interview Prep",       desc: "Practice interviews with real AI feedback." },
  { key: "cvAnalysis",           icon: "fas fa-file-alt",     title: "Smart CV Analysis",       desc: "Optimize your CV with instant AI insights." },
  { key: "skillMatching",        icon: "fas fa-brain",        title: "Skill Matching",          desc: "Match your skills with the right jobs." },
  { key: "progressTracking",     icon: "fas fa-chart-line",   title: "Progress Tracking",       desc: "Track your improvement over time." },
  { key: "voicePractice",        icon: "fas fa-microphone",   title: "Voice Practice",          desc: "Improve your speaking confidence with AI voice analysis." },
  { key: "personalityInsights",  icon: "fas fa-user-friends", title: "Personality Insights",    desc: "AI evaluates tone & presence to boost your performance." },
  { key: "learningResources",    icon: "fas fa-graduation-cap",title: "Learning Resources",     desc: "Guides and tips tailored to your job field." },
  { key: "quickRecommendations", icon: "fas fa-bolt",         title: "Quick Recommendations",   desc: "Instant tips to help you improve before interviews." },
];

const Features = () => {
  const navigate = useNavigate();

  const handleCardClick = (key) => {
    localStorage.setItem("currentFeature", key);
    navigate("/feature");
  };

  return (
    <section className="features">
      <div className="features-header">
        <div className="section-tag" style={{ display: "block", textAlign: "center" }}>
          What We Offer
        </div>
        <h2 className="section-heading" style={{ textAlign: "center" }}>
          Our recent creative projects
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          Everything you need to ace your next interview — powered by AI.
        </p>
      </div>

      <div className="features-grid">
        {featuresCards.map(({ key, icon, title, desc }) => (
          <div
            key={key}
            className="feat-card"
            onClick={() => handleCardClick(key)}
            style={{ cursor: "pointer" }}
          >
            <div className="feat-icon">
              <i className={icon}></i>
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
