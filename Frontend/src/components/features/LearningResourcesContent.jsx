export default function LearningResourcesContent() {
  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/learning resource.gif"
          className="img-fluid animate__animated animate__fadeInLeft learning-img-custom"
          alt="Learning Resources"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-book-open feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">Grow Your Skills</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-0 animate__animated animate__fadeInUp animate__delay-1s">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">CV Writing Tips</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Common Interview Questions</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Job Field Guides</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">AI Improvement Suggestions</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Recommended courses and books</span>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}