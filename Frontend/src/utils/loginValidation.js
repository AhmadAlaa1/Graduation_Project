// utils/loginValidation.js

// ── Validators ─────────────────────────────────────────────────────────────
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

// ── Main function ──────────────────────────────────────────────────────────
export function validateLogin({ email, password }) {
  const errors = [];

  // ── Email ────────────────────────────────────────────────────────────
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Please enter a valid email address");
  }

  // ── Password ─────────────────────────────────────────────────────────
  if (!password || password === "") {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.push("Password must include uppercase, lowercase, and a number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}