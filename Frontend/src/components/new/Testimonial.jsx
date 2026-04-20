const Testimonial = () => {
  return (
    <section className="testimonial">
      <div>
        <div className="section-tag">Our Testimonials</div>
        <h2 className="section-heading">Our happy customers</h2>
        <p className="section-desc">
          Thousands of job seekers have used Speak2hire to land roles at top companies. Here's what they say.
        </p>
      </div>
      <div className="testi-card">
        <div className="quote-icon">"</div>
        <div className="stars">★★★★★</div>
        <p className="testi-text">
          Speak2hire completely changed how I prepared for interviews. The AI analysis pinpointed exactly where
          I was losing confidence — and after three sessions, I got the offer. Incredible platform.
        </p>
        <div className="testi-author">
          <div className="avatar">S</div>
          <div>
            <div className="author-name">Sara M.</div>
            <div className="author-role">Software Engineer — hired at a top tech company</div>
          </div>
        </div>
        <a
          href="#"
          style={{
            color: 'var(--g2)',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '18px'
          }}
        >
          Read More Now →
        </a>
      </div>
    </section>
  );
};

export default Testimonial;
