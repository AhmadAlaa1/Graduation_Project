import { useTranslation } from "react-i18next";

export default function PersonalityInsightsContent() {
  const { t } = useTranslation();

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/insights-eight-types-graphic-1.webp"
          className="img-fluid animate__animated animate__fadeInLeft insights-img-custom"
          alt="Personality Insights"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-brain feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">{t('features_data.personalityInsights.title')}</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('features_data.personalityInsights.description')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.score_labels.excellent')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.feedback_title')}</span>
            </li>
          </ul>

          <div className="p-3 personality-box bg-light rounded-3 border border-light animate__animated animate__fadeInUp animate__delay-2s">
            <p className="mb-0 text-secondary lh-base">
              <i className="fa-solid fa-lightbulb me-2" style={{ color: "#1a9e8f" }}></i>
              {t('my_interviews.page_subtitle')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}