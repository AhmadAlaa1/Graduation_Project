import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const featuresCards = [
  { key: "aiInterview", icon: "fas fa-robot" },
  { key: "cvAnalysis", icon: "fas fa-file-alt" },
  { key: "cvBuilder", icon: "fas fa-graduation-cap" },
  { key: "skillMatching", icon: "fas fa-brain" },
  { key: "progressTracking", icon: "fas fa-chart-line" },
  { key: "voicePractice", icon: "fas fa-microphone" },
  { key: "personalityInsights", icon: "fas fa-user-friends" },
  { key: "quickRecommendations", icon: "fas fa-bolt" },
];

const Features = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (key) => {
    localStorage.setItem("currentFeature", key);

    if (key === "cvBuilder") {
      navigate("/cv-builder");
      return;
    }

    navigate("/feature");
  };

  return (
    <section className="features" id="features">
      <div className="features-header">
        <div className="section-tag" style={{ display: "block", textAlign: "center" }}>
          {t('features.section_tag')}
        </div>
        <h2 className="section-heading" style={{ textAlign: "center" }}>
          {t('features.section_heading')}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          {t('features.section_desc')}
        </p>
      </div>

      <div className="features-grid">
        {featuresCards.map(({ key, icon }) => (
          <div
            key={key}
            className="feat-card"
            onClick={() => handleCardClick(key)}
            style={{ cursor: "pointer" }}
          >
            <div className="feat-icon">
              <i className={icon}></i>
            </div>
            <h3>{t(`features.cards.${key}.title`)}</h3>
            <p>{t(`features.cards.${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;