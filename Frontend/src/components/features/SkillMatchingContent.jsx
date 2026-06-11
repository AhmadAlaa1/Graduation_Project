// components/features/SkillMatchingContent.jsx
import { useTranslation } from "react-i18next";

export default function SkillMatchingContent() {
  const { t } = useTranslation();

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/skill matching.png"
          alt="Skill Matching"
          className="img-fluid animate__animated animate__fadeInLeft"
          style={{ height: 300, width: 450 }}
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-bullseye feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">{t('features_data.skillMatching.title')}</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('features_data.skillMatching.description')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.gaps_title')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('analysis.loading_text')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('example_cv.section_subtitle')}</span>
            </li>
          </ul>

          <div className="mt-2 animate__animated animate__fadeInUp animate__delay-2s">
            <a 
              href="/analysis-cv" 
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
            >
              {t('services.cv_analysis.title')}
              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}