const Services = () => {
  return (
    <section className="services-band">
      <div className="services-grid">
        <div className="service-header">
          <div className="tag">Our Services</div>
          <h2>We Will Help You Get Hired &amp; Growing</h2>
        </div>
        <div className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
            </svg>
          </div>
          <h3>Voice Interview</h3>
          <p>Record your answers via microphone. Our AI captures your voice and analyzes tone, confidence, and clarity in real time.</p>
        </div>
        <div className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3>CV Analysis</h3>
          <p>Upload your CV and get instant AI-powered feedback matching your experience to job requirements.</p>
        </div>
        <div className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h3>Performance Report</h3>
          <p>Detailed analysis covering communication skills, answer quality, and improvement tips after every session.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
