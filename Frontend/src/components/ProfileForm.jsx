const fields = [
  { id: "firstName",       label: "First Name",  type: "text",   col: "col-md-6" },
  { id: "lastName",       label: "Last Name",   type: "text",   col: "col-md-6" },
  { id: "email",       label: "Email",       type: "email",  col: "col-12",  readOnly: true },
  { id: "phone",       label: "Phone",       type: "text",   col: "col-md-6" },
  { id: "age",         label: "Age",         type: "number", col: "col-md-6" },
  { id: "nationality", label: "Nationality", type: "text",   col: "col-md-6" },
  { id: "city",        label: "City",        type: "text",   col: "col-md-6" },
];

export default function ProfileForm({ formData, onChange, onSave, onCvChange }) {
  return (
    <div className="row g-4">
      {fields.map(({ id, label, type, col, readOnly }) => (
        <div className={col} key={id}>
          <label className="form-label fw-semibold text-secondary small mb-1">{label}</label>
          <input
            type={type}
            className="form-control form-control-custom"
            value={formData[id] || ""}
            readOnly={readOnly}
            onChange={(e) => !readOnly && onChange(id, e.target.value)}
          />
        </div>
      ))}

      {/* CV Upload */}
      <div className="col-12 mt-4">
        <label className="form-label fw-semibold text-secondary small mb-1">Update CV</label>
        <input
          type="file"
          className="form-control form-control-custom"
          accept=".pdf,.doc,.docx"
          onChange={onCvChange}
        />
      </div>

      {/* Save Button */}
      <div className="col-12 mt-5 d-flex justify-content-end">
        <button 
          type="button" 
          className="btn rounded-pill px-5 py-2 fw-semibold btn-brand shadow-sm" 
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}