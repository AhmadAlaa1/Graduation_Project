// components/features/AIInterviewContent.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

export default function AIInterviewContent() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/chat bot.gif"
          alt="AI Interview"
          style={{ height: 300, width: 380 }}
        />
      </div>
      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">

          <div className="d-flex align-items-center mb-4">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper"
              onClick={() => setShowModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-solid fa-bolt feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">{t('features.section_tag')}</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('features_data.aiInterview.description')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('interview_results.subtitle')}</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">{t('features_data.quickRecommendations.description')}</span>
            </li>
          </ul>

          <div className="mt-2">
            <a
              href="/interview"
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
            >
              {t('analysis.btn_start_interview')}
              {/* <i className="fa-solid fa-arrow-right-long"></i> */}
            </a>
          </div>

        </div>
      </div>

      {/* Tips Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={t('example_cv.preview_modal_title')}
      >
        <ul>
          <li>{t('features_data.quickRecommendations.description')}</li>
          <li>{t('essay_input.placeholder')}</li>
          <li>{t('voice_recorder.status_ready')}</li>
        </ul>
      </Modal>
    </div>
  );
}