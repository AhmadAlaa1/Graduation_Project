// components/features/AIInterviewContent.jsx
import { useState } from "react";
import Modal from "./Modal";

export default function AIInterviewContent() {
  const [showModal, setShowModal] = useState(false);

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
            >
              <i className="fa-solid fa-bolt feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">Features</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Behavioral & technical question practice</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Real-time scoring and feedback</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Step-by-step improvement suggestions</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Record answers and compare over time</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Instant AI tips for improving answers</span>
            </li>
          </ul>

          <div className="mt-2">
            <a
              href="landingscape.html"
              className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
            >
              Start Interview
              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>

        </div>
      </div>

      {/* Tips Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Interview Tips"
      >
        <ul>
          <li>Practice common behavioral questions first.</li>
          <li>Keep answers clear and concise.</li>
          <li>Show confidence with your tone and body language.</li>
          <li>Use examples from your past experience.</li>
          <li>Listen carefully and pause before answering.</li>
        </ul>
      </Modal>
    </div>
  );
}
