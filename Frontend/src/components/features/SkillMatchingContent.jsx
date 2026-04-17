// components/features/SkillMatchingContent.jsx

export default function SkillMatchingContent() {
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
        <h3 className="mb-0 fw-bold feature-subtitle">Match & Improve</h3>
      </div>

      <ul className="list-unstyled d-flex flex-column gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
        <li className="d-flex align-items-start">
          <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
          <span className="text-secondary">AI analysis of your skills vs job requirements</span>
        </li>
        <li className="d-flex align-items-start">
          <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
          <span className="text-secondary">Identify skill gaps and strengths</span>
        </li>
        <li className="d-flex align-items-start">
          <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
          <span className="text-secondary">Personalized learning resources to fill gaps</span>
        </li>
        <li className="d-flex align-items-start">
          <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
          <span className="text-secondary">Tips for highlighting relevant skills in your CV</span>
        </li>
      </ul>

      <div className="mt-2 animate__animated animate__fadeInUp animate__delay-2s">
        <a 
          href="analysis.html" 
          className="btn w-100 w-lg-auto py-2 px-4 rounded-pill d-inline-flex align-items-center justify-content-center gap-2 shadow-sm fw-semibold btn-feature-ai"
        >
          CV Analysis
          <i className="fa-solid fa-arrow-right-long"></i>
        </a>
      </div>

    </div>
  </div>
</div>
  );
}
