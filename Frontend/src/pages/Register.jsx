import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import Navbar from "../components/Navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/animations/Hiring.json";
import toast from "react-hot-toast";
import { validateRegisterStep } from "../utils/registerValidation";
import { useAuth } from "../hooks/useAuth";

const STEPS = [
  { title: "What's your name?", fields: ["firstName", "lastName"] },
  { title: "Your contact info", fields: ["email", "password"] },
  { title: "Personal details", fields: ["phone", "age", "nationality", "city"] },
  { title: "Upload your CV", fields: ["cv"] },
];

const initialForm = {
  firstName: "", lastName: "", email: "", password: "",
  phone: "", age: "", nationality: "", city: "", cv: null,
};

export default function Register() {
  const navigate = useNavigate();

  // ── useAuth instead of redux direct ──
  const {
    register,
    loading,
    error,
    success,
    clearState,
  } = useAuth();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // ── error handling ─────────────────────
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearState();
    }
  }, [error]);

  // ── success handling ───────────────────
  useEffect(() => {
    if (success) {
      toast.success("Registered Successfully ");
      clearState();

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      // return () => clearTimeout(timer);const timer = 
    }
  }, [success]);

  // ── handle input ───────────────────────
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ── validation ─────────────────────────
  const validateStep = () => {
    const newErrors = validateRegisterStep(step, formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg));
      return false;
    }
    return true;
  };

  // ── navigation ─────────────────────────
  const handleNext = () => {
    if (loading) return;
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (loading) return;
    setStep((s) => s - 1);
  };

  // ── submit ─────────────────────────────
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
                <span
                  key={i}
                  className={`dot ${i === step ? "active" : i < step ? "done" : ""}`}
                />
              ))}
            </div>

            <h2 className="register-title">{STEPS[step].title}</h2>
            <p className="step-counter">Step {step + 1} of {STEPS.length}</p>

            <div className="register-form">

              {step === 0 && (
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "error" : ""}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "error" : ""}
                      />
                    </div>

                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        placeholder="25"
                        min="0"
                        value={formData.age}
                        onChange={handleChange}
                        className={errors.age ? "error" : ""}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Nationality</label>
                      <input
                        type="text"
                        name="nationality"
                        placeholder="American"
                        value={formData.nationality}
                        onChange={handleChange}
                        className={errors.nationality ? "error" : ""}
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? "error" : ""}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="form-group">
                  <label>Upload Your CV</label>

                  <div className="file-upload">
                    <input
                      type="file"
                      id="cvUpload"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="file-input"
                    />

                    <label htmlFor="cvUpload" className="file-btn">
                      Choose File
                    </label>

                    <span className="file-name">
                      {formData.cv ? formData.cv.name : "No file chosen"}
                    </span>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {step > 0 && (
                  <button
                    className="btn-back"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Back
                  </button>
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    className="btn-next"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="btn-submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                )}
              </div>
            </div>

            <p className="login-link">
              Have an account? <a href="/login">Log In</a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}