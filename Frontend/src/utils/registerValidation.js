export const validateRegisterStep = (step, formData) => {
  const errors = {};

  if (step === 0) {
    if (!formData.firstName.trim())
      errors.firstName = "First name is required";
    else if (formData.firstName.trim().length < 2)
      errors.firstName = "First name must be at least 2 characters";

    if (!formData.lastName.trim())
      errors.lastName = "Last name is required";
    else if (formData.lastName.trim().length < 2)
      errors.lastName = "Last name must be at least 2 characters";
  }

  if (step === 1) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim())
      errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Enter a valid email address";

    if (!formData.password)
      errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.password))
      errors.password = "Password must contain at least one uppercase letter";
    else if (!/[0-9]/.test(formData.password))
      errors.password = "Password must contain at least one number";
  }

  if (step === 2) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!formData.phone.trim())
      errors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      errors.phone = "Enter a valid phone number";

    if (!formData.age)
      errors.age = "Age is required";
    else if (formData.age < 18 || formData.age > 60)
      errors.age = "Age must be between 18 and 60";

    if (!formData.nationality.trim())
      errors.nationality = "Nationality is required";

    if (!formData.city.trim())
      errors.city = "City is required";
  }

  if (step === 3) {
    if (!formData.cv)
      errors.cv = "CV is required";
    else if (!["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      .includes(formData.cv.type))
      errors.cv = "CV must be PDF or Word document";
    else if (formData.cv.size > 5 * 1024 * 1024)
      errors.cv = "CV size must be less than 5MB";
  }

  return errors;
};