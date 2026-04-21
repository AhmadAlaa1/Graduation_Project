export default function CvProjects({ projects }) {
  const filtered = projects?.filter(p => p.name && p.name !== "& EXPERIENCE");
  if (!filtered?.length) return null;

  return (
    <div className="an-card mb-4">
      <h5 className="an-card-title">
        <i className="fas fa-folder-open me-2"></i>Projects
      </h5>
      <div className="an-timeline">
        {filtered.map((p, i) => (
          <div key={i} className="an-timeline-item">
            <div className="an-timeline-dot" />
            <div className="an-timeline-content">
              <h6 className="an-timeline-role">{p.name}</h6>
              {p.role && <span className="an-timeline-meta">{p.role}</span>}
              {p.year && <span className="an-timeline-meta ms-2">{p.year}</span>}
              {p.highlights?.length > 0 && (
                <ul className="an-timeline-highlights">
                  {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
