import { useTranslation } from "react-i18next";

export default function ProfileForm({ formData, onChange, onSave, onCvChange, loading }) {
  const { t } = useTranslation();

  const fields = [
    { id: "firstName", label: t('profile.fields.firstName'), type: "text", col: "col-md-6" },
    { id: "lastName", label: t('profile.fields.lastName'), type: "text", col: "col-md-6" },
    { id: "email", label: t('profile.fields.email'), type: "email", col: "col-12", readOnly: true },
    { id: "phone", label: t('profile.fields.phone'), type: "text", col: "col-md-6" },
    { id: "age", label: t('profile.fields.age'), type: "number", col: "col-md-6" },
    { id: "nationality", label: t('profile.fields.nationality'), type: "text", col: "col-md-6" },
    { id: "city", label: t('profile.fields.city'), type: "text", col: "col-md-6" },
  ];

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
      <div className="form-group col-12 mt-4">
        <label className="form-label fw-semibold text-secondary small mb-1">{t('profile.update_cv_label')}</label>

        <div className="file-upload">
          <input
            type="file"
            id="cvUpload"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={onCvChange}
            className="file-input"
          />

          <label htmlFor="cvUpload" className="file-btn">
            {t('profile.cv_btn')}
          </label>

          <span className="file-name">
            {formData.cv ? formData.cv.name : t('profile.cv_no_file')}
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="col-12 mt-5 d-flex justify-content-end">
        <button
          type="button"
          className="btn rounded-pill px-5 py-2 fw-semibold btn-brand shadow-sm"
          onClick={onSave}
          disabled={loading}
        >
          {loading ? t('profile.delete_loading_text') : t('profile.save_changes_btn')}
        </button>
      </div>
    </div>
  );
}