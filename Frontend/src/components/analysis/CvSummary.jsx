export default function CvSummary({ data }) {
  // الـ name بتاع الـ API فيه GitHub وLinkedIn جوا
  // بناخد أول جزء قبل |
  const cleanName = data.title?.split("|")[0]?.trim() || data.name;

  return (
    <div className="an-card h-100">
      <h3 className="an-name">{cleanName}</h3>
      <p className="an-location">
        <i className="fa-solid fa-location-dot me-2"></i>
        {data.location}
      </p>
      <p className="an-summary">{data.summary}</p>
    </div>
  );
}
