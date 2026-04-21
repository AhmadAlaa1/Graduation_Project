export default function CvEducation({ education }) {
  if (!education?.length) return null;

  return (
    <div className="an-card mb-4">
      <h5 className="an-card-title">
        <i className="fas fa-graduation-cap me-2"></i>Education
      </h5>
      <div className="an-timeline">
        {education.map((edu, i) => (
          <div key={i} className="an-timeline-item">
            <div className="an-timeline-dot" />
            <div className="an-timeline-content">
              <h6 className="an-timeline-role">{edu.degree}</h6>
              <span className="an-timeline-meta">{edu.institution}</span>
              {edu.status && (
                <span className="an-edu-status">{edu.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
