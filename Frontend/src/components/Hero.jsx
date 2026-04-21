const Hero = () => {
  return (
    <section className="hero">
      <div className="blob-bg"></div>
      <div className="hero-text">
        <div className="eyebrow">AI-Powered Interview Platform</div>
        <h1>Interview smarter.<br />Get hired <em>faster.</em></h1>
        <p className="hero-desc">
          Upload your CV, record your voice interview, and let our AI analyze your performance —
          giving you real insights to land your dream job.
        </p>
        <div className="hero-btns">
          <a className="btn btn-grad" href="/interview">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Interview
          </a>
          <a className="btn btn-outline" href="#">Read the full story</a>
        </div>
      </div>
      <div className="hero-img-area">
        <div className="hero-blob-wrap">
          <div className="dshape ds-circ-g"></div>
          <div className="dshape ds-circ-b"></div>
          <div className="dshape ds-sq-y"></div>
          <div className="dshape ds-circ-p"></div>
          <div className="dshape ds-tri"></div>
          <div className="dshape ds-tri2"></div>
          <div className="dshape ds-dia"></div>
          <div className="hero-blob">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <circle cx="100" cy="100" r="90" fill="rgba(61,191,138,0.06)" />
              <rect x="82" y="28" width="36" height="72" rx="18" stroke="#1a9e8f" strokeWidth="3.5" fill="rgba(61,191,138,0.1)" />
              <path d="M50 100c0 28 22 50 50 50s50-22 50-50" stroke="#3dbf8a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <line x1="100" y1="150" x2="100" y2="172" stroke="#1a9e8f" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="78" y1="172" x2="122" y2="172" stroke="#1a9e8f" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="20" y="84" width="7" height="32" rx="3.5" fill="#3dbf8a" opacity=".45" />
              <rect x="32" y="72" width="7" height="56" rx="3.5" fill="#3dbf8a" opacity=".65" />
              <rect x="44" y="90" width="7" height="20" rx="3.5" fill="#3dbf8a" opacity=".45" />
              <rect x="149" y="84" width="7" height="32" rx="3.5" fill="#1a9e8f" opacity=".45" />
              <rect x="161" y="72" width="7" height="56" rx="3.5" fill="#1a9e8f" opacity=".65" />
              <rect x="173" y="90" width="7" height="20" rx="3.5" fill="#1a9e8f" opacity=".45" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
