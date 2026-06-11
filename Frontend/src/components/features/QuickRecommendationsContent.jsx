import { useTranslation } from "react-i18next";

export default function QuickRecommendationsContent() {
  const { t } = useTranslation();

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/giphy.gif"
          className="img-fluid animate__animated animate__fadeInLeft quick-img-custom"
          alt="Quick Recommendations"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-stopwatch feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">{t('features_data.quickRecommendations.title')}</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-0 animate__animated animate__fadeInUp animate__delay-1s">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.overall_score_label')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.feedback_title')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('ats_panel.improvements_title')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('voice_recorder.status_ready')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('features_data.quickRecommendations.description')}</span>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}