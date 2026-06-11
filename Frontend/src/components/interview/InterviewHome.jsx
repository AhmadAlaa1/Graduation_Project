import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ROLES_KEYS = ["frontend", "backend", "fullstack", "mobile", "devops", "data", "uiux", "pm"];
const LEVELS_KEYS = ["junior", "mid", "senior"];

export default function InterviewHome({ onStart, onStartWithJob }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState(null); // null | "cv" | "job"
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [customRole, setCustomRole] = useState("");

  const finalRole = role === "__custom__" ? customRole.trim() : t(`interview_home.roles.${role}`);
  const canSubmit = role && level && (role !== "__custom__" || customRole.trim());

  const handleJobStart = () => {
    if (!canSubmit) return;
    // نمرر القيمة الحقيقية للدور المختار
    const roleValue = role === "__custom__" ? customRole.trim() : t(`interview_home.roles.${role}`);
    onStartWithJob({ role: roleValue, level: t(`interview_home.levels.${level}`) });
  };

  // ===== CV mode → start directly =====
  useEffect(() => {
    if (mode === "cv") {
      onStart();
    }
  }, [mode]);

  // ===== Initial screen =====
  if (!mode) {
    return (
      <div className="quiz-intro-wrapper rounded-4 p-5 text-center mx-auto">
        <div className="mb-4">
          <span className="badge quiz-intro-text-brand px-3 py-2 rounded-pill fw-medium border">
            <i className="fa-solid fa-clipboard-question me-2"></i>
            {t('interview_home.badge')}
          </span>
        </div>

        <h1 className="fw-bold mb-3">{t('interview_home.title')}</h1>
        <p className="text-secondary mb-5 fs-5">
          {t('interview_home.subtitle')}
        </p>

        <div className="d-flex flex-column gap-3">
          <button
            className="btn quiz-intro-btn-brand rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center justify-content-center gap-2 shadow-sm w-100"
            onClick={() => setMode("cv")}
          >
            <i className="fa-solid fa-file-lines"></i>
            {t('interview_home.btn_cv')}
          </button>

          <button
            className="btn quiz-intro-btn-outline rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center justify-content-center gap-2 w-100"
            onClick={() => setMode("job")}
          >
            <i className="fa-solid fa-briefcase"></i>
            {t('interview_home.btn_job')}
          </button>
        </div>
      </div>
    );
  }

  // ===== Job mode → show form =====
  return (
    <div className="quiz-intro-wrapper rounded-4 p-5 mx-auto">
      <button
        className="btn btn-link p-0 mb-4 text-secondary d-flex align-items-center gap-2"
        onClick={() => setMode(null)}
      >
        <i className="fa-solid fa-arrow-left"></i> {t('interview_home.btn_back')}
      </button>

      <div className="mb-4 text-center">
        <span className="badge quiz-intro-text-brand px-3 py-2 rounded-pill fw-medium border">
          <i className="fa-solid fa-briefcase me-2"></i>
          {t('interview_home.custom_badge')}
        </span>
      </div>

      <h2 className="fw-bold mb-4 text-center">{t('interview_home.custom_title')}</h2>

      {/* Role */}
      <div className="mb-3">
        <label className="form-label fw-medium">{t('interview_home.role_label')}</label>
        <select
          className="form-select rounded-3 py-2"
          value={role}
          onChange={(e) => { setRole(e.target.value); setCustomRole(""); }}
        >
          <option value="">{t('interview_home.role_placeholder')}</option>
          {ROLES_KEYS.map((rKey) => (
            <option key={rKey} value={rKey}>{t(`interview_home.roles.${rKey}`)}</option>
          ))}
          <option value="__custom__">{t('interview_home.role_other')}</option>
        </select>
      </div>

      {role === "__custom__" && (
        <div className="mb-3">
          <input
            className="form-control rounded-3 py-2"
            placeholder={t('interview_home.role_custom_placeholder')}
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
        </div>
      )}

      {/* Level */}
      <div className="mb-4">
        <label className="form-label fw-medium">{t('interview_home.level_label')}</label>
        <div className="d-flex gap-2">
          {LEVELS_KEYS.map((lKey) => (
            <button
              key={lKey}
              className={`btn flex-fill rounded-pill py-2 fw-medium ${level === lKey ? "quiz-intro-btn-brand" : "quiz-intro-btn-outline"}`}
              onClick={() => setLevel(lKey)}
            >
              {t(`interview_home.levels.${lKey}`)}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn quiz-intro-btn-brand rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center justify-content-center gap-2 shadow-sm w-100"
        onClick={handleJobStart}
        disabled={!canSubmit}
      >
        {t('interview_home.btn_start')}
        <i className="fa-solid fa-arrow-right mt-1"></i>
      </button>
    </div>
  );
}