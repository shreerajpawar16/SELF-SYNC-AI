export const validateEmail = (email) => {
  const trimmed = (email || '').trim();
  if (!trimmed) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password.length > 128) return 'Password is too long';
  return '';
};

export const validateStrongPassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 128) return 'Password is too long';
  if (!/[A-Z]/.test(password)) return 'Add at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Add at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Add at least one number';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Add at least one special character';
  return '';
};

export const validateName = (name) => {
  const trimmed = (name || '').trim();
  if (!trimmed) return 'Name is required';
  if (trimmed.length < 2) return 'Name must be at least 2 characters';
  if (trimmed.length > 100) return 'Name is too long';
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Name contains invalid characters';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

export const validateInterviewSetup = (setup) => {
  const errors = {};
  if (!setup.jobRole) errors.jobRole = 'Job role is required';
  if (!setup.experienceLevel) errors.experienceLevel = 'Experience level is required';
  if (!setup.interviewType) errors.interviewType = 'Interview type is required';
  if (!setup.programmingLanguage) errors.programmingLanguage = 'Programming language is required';
  if (!setup.difficulty) errors.difficulty = 'Difficulty is required';
  if (!setup.duration) errors.duration = 'Duration is required';
  return errors;
};

export const isStrongPassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return { label: 'Weak', color: 'red', percentage: 25 };
  if (score <= 4) return { label: 'Medium', color: 'yellow', percentage: 50 };
  if (score <= 5) return { label: 'Strong', color: 'green', percentage: 75 };
  return { label: 'Very Strong', color: 'green', percentage: 100 };
};

