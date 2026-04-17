const HowItWorks = () => {
  return (
    <section className="how">
      <div className="how-img">
        <div className="how-blob">
          <svg viewBox="0 0 200 280" fill="none" width="180">
            <circle cx="100" cy="70" r="55" stroke="#1a9e8f" strokeWidth="3" />
            <rect x="30" y="145" width="140" height="120" rx="20" stroke="#1a9e8f" strokeWidth="3" />
          </svg>
        </div>
        <div className="how-dc1"></div>
        <div className="how-dc2"></div>
      </div>
      <div>
        <div className="section-tag">About Our Company</div>
        <h2 className="section-heading">Our interview process road</h2>
        <p className="section-desc">
          Three simple steps to go from applicant to hired. Speak2hire handles the heavy lifting —
          you focus on showing your best self.
        </p>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-badge">01</div>
            <div>
              <h3>Upload Your CV</h3>
              <p>Drop your CV into our platform. Our AI reads it instantly and builds a personalized interview tailored to your background and target role.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-badge">02</div>
            <div>
              <h3>Record Your Interview</h3>
              <p>Answer AI-generated questions using your voice. No scheduling, no pressure — practice as many times as you need.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-badge">03</div>
            <div>
              <h3>Get Your Analysis</h3>
              <p>Receive a full performance report with scores, feedback, and actionable tips to improve your answers and land the job.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
