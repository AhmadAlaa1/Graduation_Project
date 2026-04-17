export default function ProfileProgress({ percent }) {
  return (
    <div className="w-100 mt-4 px-3 text-center">
      <label className="fw-semibold text-secondary small mb-2 d-block">
        Profile Completeness <span className="text-dark">({percent}%)</span>
      </label>
      <div className="progress progress-custom">
        <div
          className="progress-bar progress-bar-custom"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}