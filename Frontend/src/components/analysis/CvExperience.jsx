export default function CvExperience({ experience }) {
  if (!experience?.length) return null;

  return (
    <div className="an-card mb-4">
      <h5 className="an-card-title">
        <i className="fas fa-briefcase me-2"></i>Experience
      </h5>
      <div className="an-timeline">
        {experience.map((exp, i) => (
          <div key={i} className="an-timeline-item">
            <div className="an-timeline-dot" />
            <div className="an-timeline-content">
              <h6 className="an-timeline-role">{exp.role}</h6>
              {exp.location && (
                <span className="an-timeline-meta">
                  <i className="fa-solid fa-location-dot me-1"></i>{exp.location}
                </span>
              )}
              {exp.dates && (
                <span className="an-timeline-meta ms-2">
                  <i className="fa-solid fa-calendar me-1"></i>{exp.dates}
                </span>
              )}
              {exp.highlights?.length > 0 && (
                <ul className="an-timeline-highlights">
                  {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
