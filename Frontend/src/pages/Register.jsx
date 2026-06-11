import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../assets/css/register.css";
import Navbar from "../components/Navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/animations/Hiring.json";
import toast from "react-hot-toast";
import { validateRegisterStep } from "../utils/registerValidation";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const STEPS = [
    { title: t('register.steps.step0_title'), fields: ["firstName", "lastName"] },
    { title: t('register.steps.step1_title'), fields: ["email", "password"] },
    { title: t('register.steps.step2_title'), fields: ["phone", "age", "nationality", "city"] },
    { title: t('register.steps.step3_title'), fields: ["cv"] },
  ];

  const initialForm = {
    firstName: "", lastName: "", email: "", password: "",
    phone: "", age: "", nationality: "", city: "", cv: null,
  };

  const { register, loading, error, success, clearState } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearState();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(t('register.success_msg'));
      clearState();
      setTimeout(() => { navigate("/login"); }, 1500);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = validateRegisterStep(step, formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (loading) return;
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (loading) return;
    setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (loading) return;
    if (!validateStep()) return;

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      age: formData.age,
      nationality: formData.nationality,
      city: formData.city,
    };

    const body = new FormData();
    body.append("data", JSON.stringify(data));
    body.append("cv", formData.cv);
    register(body);
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <div className="register-left d-none d-md-block">
          <Player autoplay loop src={animationData} className="lottie-player" />
        </div>
        <div className="register-right">
          <div className="register-section">
            <div className="step-dots">
              {STEPS.map((_, i) => (
                <span key={i} className={`dot ${i === step ? "active" : i < step ? "done" : ""}`} />
              ))}
            </div>
            <h2 className="register-title">{STEPS[step]?.title}</h2>
            <p className="step-counter">{t('register.step_counter', { current: step + 1, total: STEPS.length })}</p>

            <div className="register-form">
              {step === 0 && (
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('register.fields.first_name')}</label>
                    <input type="text" name="firstName" placeholder={t('register.fields.first_name_placeholder')} value={formData.firstName} onChange={handleChange} className={errors.firstName ? "error" : ""} />
                  </div>
                  <div className="form-group">
                    <label>{t('register.fields.last_name')}</label>
                    <input type="text" name="lastName" placeholder={t('register.fields.last_name_placeholder')} value={formData.lastName} onChange={handleChange} className={errors.lastName ? "error" : ""} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="form-group">
                    <label>{t('register.fields.email')}</label>
                    <input type="email" name="email" placeholder={t('register.fields.email_placeholder')} value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} />
                  </div>
                  <div className="form-group">
                    <label>{t('register.fields.password')}</label>
                    <input type="password" name="password" placeholder={t('register.fields.password_placeholder')} value={formData.password} onChange={handleChange} className={errors.password ? "error" : ""} />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('register.fields.phone')}</label>
                      <input type="text" name="phone" placeholder={t('register.fields.phone_placeholder')} value={formData.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
                    </div>
                    <div className="form-group">
                      <label>{t('register.fields.age')}</label>
                      <input type="number" name="age" placeholder={t('register.fields.age_placeholder')} min="0" value={formData.age} onChange={handleChange} className={errors.age ? "error" : ""} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('register.fields.nationality')}</label>
                      <input type="text" name="nationality" placeholder={t('register.fields.nationality_placeholder')} value={formData.nationality} onChange={handleChange} className={errors.nationality ? "error" : ""} />
                    </div>
                    <div className="form-group">
                      <label>{t('register.fields.city')}</label>
                      <input type="text" name="city" placeholder={t('register.fields.city_placeholder')} value={formData.city} onChange={handleChange} className={errors.city ? "error" : ""} />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="form-group">
                  <label>{t('register.fields.cv_label')}</label>
                  <div className="file-upload">
                    <input type="file" id="cvUpload" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} className="file-input" />
                    <label htmlFor="cvUpload" className="file-btn">{t('register.fields.cv_btn')}</label>
                    <span className="file-name">{formData.cv ? formData.cv.name : t('register.fields.cv_no_file')}</span>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {step > 0 && <button className="btn-back" onClick={handleBack} disabled={loading}>{t('register.btn_back')}</button>}
                {step < STEPS.length - 1 ? (
                  <button className="btn-next" onClick={handleNext} disabled={loading}>{t('register.btn_next')}</button>
                ) : (
                  <button className="btn-submit" onClick={handleSubmit} disabled={loading}>{loading ? t('register.btn_loading') : t('register.btn_submit')}</button>
                )}
              </div>
            </div>
            <p className="login-link">{t('register.have_account')} <a href="/login">{t('register.login_link')}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}