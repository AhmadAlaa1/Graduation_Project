// components/features/CVAnalysisContent.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCv } from "../../hooks/useCv";
import toast from "react-hot-toast";

export default function CVAnalysisContent() {
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
      toast.success("CV uploaded successfully 🚀", {
        duration: 2500,
        style: {
          borderRadius: "10px",
          background: "#1a9e8f",
          color: "#fff",
        },
      });

      clearCvState();

    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong ❌", {
        duration: 3000,
      });
      clearCvState();
    }
  }, [error]);

  // ✅ Upload CV
  const handleSave = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please select a CV first 📄");
      return;
    }

    // 🔥 Validation
    if (!file.type.includes("pdf")) {
      toast.error("Only PDF files are allowed ❌");
      return;
    }

    setFileName(file.name);
    uploadCv(file);
    setShowModal(false);
  };

  return (
    <div className="row align-items-center">

      {/* LEFT IMAGE */}
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/cv analysis.gif"
          alt="CV Analysis"
          style={{ height: 300, width: 350 }}
          className="img-fluid"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">

          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-file-arrow-up feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">Upload & Analyze</h3>
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
              <span className="text-secondary">Keyword matching for target jobs</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Formatting suggestions for ATS systems</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Highlight strengths and weak points</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Tips for a more professional layout</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Suggestions for improving readability</span>
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-3 mt-2">

            {/* Upload Button */}
            <button
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill shadow-sm fw-semibold btn-outline-feature"
              onClick={() => setShowModal(true)}
            >
              Update CV
            </button>

            {/* Analyze Button */}
            <button
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
              onClick={() => navigate("/analysis-cv")}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze CV"}
              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </button>

          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Upload New CV"
        footer={
          <button
            className="btn btn-feature-ai py-2 px-4 rounded-pill"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save CV"}
          </button>
        }
      >
        <div className="text-center p-3">
          <input
            type="file"
            ref={fileInputRef}
            className="form-control mb-2"
            accept=".pdf,.doc,.docx"
          />

          {loading && (
            <div className="spinner-border text-success mt-2"></div>
          )}

          <small className="text-muted d-block mt-2">
            <i className="fa-solid fa-circle-info me-1"></i>
            Accepted formats: PDF (preferred)
          </small>
        </div>
      </Modal>

    </div>
  );
}