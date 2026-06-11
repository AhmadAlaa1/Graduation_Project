import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateLogin } from "../utils/loginValidation";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import "../assets/css/login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const { t } = useTranslation();

  const { login, loading, error, success, clearState } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const text = t('login.typewriter_text');
    el.textContent = "";

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i++];
      } else {
        el.style.borderRight = "none";
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [t]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearState();
    }
  }, [error, clearState]);

  useEffect(() => {
    if (success) {
      toast.success(t('login.success_msg'));
      navigate("/");
      clearState();
    }
  }, [success, navigate, clearState, t]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { isValid, errors } = validateLogin({ email, password });
    if (!isValid) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    await login({ email: email.trim(), password });
  };

  return (
    <>
      <Navbar />
      <section className="loginDivsec">
        <div className="container">
          <div className="login-card">
            <div className="form-side d-flex flex-column justify-content-center">
              <h2 ref={titleRef} className="typewriter-title" />
              <form onSubmit={handleLogin} noValidate>
                <div className="mb-3">
                  <label className="form-label">{t('login.email_label')}</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={t('login.email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">{t('login.password_label')}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t('login.password_placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                <div className="remember-row mb-3">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label htmlFor="remember">{t('login.remember_me')}</label>
                </div>
                <button type="submit" className="btn-login" disabled={loading}>
                  {loading ? t('login.btn_loading') : t('login.btn_login')}
                </button>
              </form>
              <p className="register-link">
                {t('login.no_account')} <Link to="/register">{t('login.register_link')}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}