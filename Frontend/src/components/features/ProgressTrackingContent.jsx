import { useState, useEffect } from "react";

export default function ProgressTrackingContent() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = 90;
    let current = 0;
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current++;
        setProgress(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/progress track.png"
          className="img-fluid rounded animate__animated animate__fadeInLeft progress-img-custom"
          alt="Progress Tracking"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-chart-line feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">Track & Improve</h3>
          </div>

          <div className="progress mb-4 animate__animated animate__fadeInUp animate__delay-1s progress-container-custom">
            <div
              className="progress-bar d-flex align-items-center justify-content-center fw-bold progress-bar-custom"
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-0 animate__animated animate__fadeInUp animate__delay-1s">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Track score trends</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Identify weak areas</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Set personal goals</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Update progress every time you study or take a mock interview</span>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}