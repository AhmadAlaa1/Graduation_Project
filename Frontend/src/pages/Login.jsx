// pages/Login.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateLogin } from "../utils/loginValidation";
import toast from "react-hot-toast";
import "../assets/css/login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  const { login, loading, error, success, clearState } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // ── Typewriter Effect ──────────────────────────────────────────────────
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const text = "Good to See You Again";
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
  }, []);

  // ── Error Handling ─────────────────────────────────────────────────────
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearState();
    }
  }, [error, clearState]);

  // ── Success Handling ───────────────────────────────────────────────────
  useEffect(() => {
    if (success) {
      toast.success("Welcome back");
      navigate("/");
      clearState();
    }
  }, [success, navigate, clearState]);

  // ── Submit ─────────────────────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────────────────
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
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
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
                  <label htmlFor="remember">Remember Me</label>
                </div>

                <button type="submit" className="btn-login" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>

              </form>

              <p className="register-link">
                Don't Have An Account? <Link to="/register">Register</Link>
              </p>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
