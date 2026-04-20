// utils/profileValidation.js

export const FIELD_KEYS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "age",
  "nationality",
  "city",
];

// ── Friendly labels ────────────────────────────────────────────────────────
const LABELS = {
  firstName:   "First Name",
  lastName:    "Last Name",
  email:       "Email",
  phone:       "Phone",
  age:         "Age",
  nationality: "Nationality",
  city:        "City",
};

// ── Format validators ──────────────────────────────────────────────────────
const VALIDATORS = {
  email: {
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: "Email is not valid",
  },
  phone: {
    test: (v) => /^\+?[0-9]{7,15}$/.test(v.replace(/\s/g, "")),
    message: "Phone must be 7–15 digits",
  },
  age: {
    test: (v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 16 && n <= 80;
    },
    message: "Age must be between 16 and 80",
  },
};

// ── Main function ──────────────────────────────────────────────────────────
export function validateProfile(data) {
  const errors = [];

  FIELD_KEYS.forEach((key) => {
    const value = String(data[key] || "").trim();
    const label = LABELS[key];

    // Required check
    if (!value) {
      errors.push(`${label} is required`);
      return; // skip format check if empty
    }

    // Format check (only for fields that have a validator)
    if (VALIDATORS[key] && !VALIDATORS[key].test(value)) {
      errors.push(VALIDATORS[key].message);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}