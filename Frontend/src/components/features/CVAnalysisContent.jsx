// components/features/CVAnalysisContent.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { useCv } from "../../hooks/useCv";
import toast from "react-hot-toast";
import cvAnalysisGif from "../../assets/images/cv analysis.gif";

export default function CVAnalysisContent() {
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    uploadCv,
    fetchCvAnalysis,
    analysis,
    loading,
    error,
    success,
    clearCvState,
  } = useCv();

  // ✅ Toasts
  useEffect(() => {
    if (success) {
      toast.success(t("cv_analysis_content.upload_success"), {
        duration: 2500,
        style: {
          borderRadius: "10px",
          background: "#1a9e8f",
          color: "#fff",
        },
      });

      clearCvState();
    }
  }, [success, t]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
      });
      clearCvState();
    }
  }, [error]);

  // ✅ Upload CV
  const handleSave = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error(t("cv_analysis_content.select_cv_first"));
      return;
    }
    if (!file.type.includes("pdf")) {
      toast.error(t("cv_analysis_content.pdf_only"));
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    uploadCv(formData);
    setShowModal(false);
  };

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src={cvAnalysisGif}
          alt="CV Analysis"
          style={{ height: 320, width: 420 }}
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">

          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-file-arrow-up feature-icon" />
            </div>

            <h3 className="mb-0 fw-bold feature-subtitle">
              {t("cv_analysis_content.title")}
            </h3>
          </div>

          {/* File Name */}
          {fileName && (
            <div className="d-flex align-items-center mb-4 p-2 px-3 rounded bg-light border border-success border-opacity-25 w-fit-content">
              <i className="fa-solid fa-file-circle-check me-2 text-success" />
              <span className="text-success fw-medium">{fileName}</span>
            </div>
          )}

          {/* Features List */}
          <ul className="list-unstyled d-flex flex-column gap-3 mb-4">

            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">
                {t("cv_analysis_content.features.keyword_matching")}
              </span>
            </li>

            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">
                {t("cv_analysis_content.features.ats_formatting")}
              </span>
            </li>

            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">
                {t("cv_analysis_content.features.strengths_weaknesses")}
              </span>
            </li>

            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">
                {t("cv_analysis_content.features.professional_layout")}
              </span>
            </li>

            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">
                {t("cv_analysis_content.features.readability")}
              </span>
            </li>

          </ul>

          {/* Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-3 mt-2">

            <button
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill shadow-sm fw-semibold btn-outline-feature"
              onClick={() => setShowModal(true)}
            >
              {t("cv_analysis_content.upload_btn")}
            </button>

            <button
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
              onClick={() => navigate("/analysis-cv")}
              disabled={loading}
            >
              {loading
                ? t("cv_analysis_content.analyzing")
                : t("cv_analysis_content.analyze_btn")}

              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </button>

          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={t("cv_analysis_content.upload_modal_title")}
        footer={
          <button
            className="btn btn-feature-ai py-2 px-4 rounded-pill"
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? t("cv_analysis_content.uploading")
              : t("cv_analysis_content.save_btn")}
          </button>
        }
      >
        <div className="text-center p-3">
          <input
            type="file"
            ref={fileInputRef}
            className="form-control mb-2"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFileName(e.target.files[0]?.name || "")}
          />

          {loading && (
            <div className="spinner-border text-success mt-2"></div>
          )}

          <small className="text-muted d-block mt-2">
            <i className="fa-solid fa-circle-info me-1"></i>

            {fileName
              ? fileName
              : t("cv_analysis_content.accepted_formats")}
          </small>
        </div>
      </Modal>
    </div>
  );
}