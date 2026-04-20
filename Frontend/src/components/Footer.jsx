const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            className="logo"
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              fontSize: '19px',
              fontWeight: 800,
              color: 'white'
            }}
          >
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" width="20" height="20">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </div>
            Speak<span className="hi">2</span>hire
          </a>
          <p>An AI-powered interview platform helping job seekers practice, improve, and land their dream roles through voice-based analysis and CV insights.</p>
          <div className="footer-socials">
            <a className="social-btn" href="#">f</a>
            <a className="social-btn" href="#">t</a>
            <a className="social-btn" href="#">in</a>
            <a className="social-btn" href="#">yt</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Case Study</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Store</h4>
          <ul>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">License</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Refunds</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Projects</a></li>
            <li><a href="#">Our Office</a></li>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Speak2hire. All rights reserved.</span>
        <span>Privacy Policy · Terms of Use</span>
      </div>
    </footer>
  );
};

export default Footer;
