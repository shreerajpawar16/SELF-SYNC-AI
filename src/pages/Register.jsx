import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateStrongPassword, validateName, validateConfirmPassword, getPasswordStrength } from '../utils/validators';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    // Trim inputs
    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
    setForm(trimmedForm);

    const newErrors = {
      name: validateName(trimmedForm.name),
      email: validateEmail(trimmedForm.email),
      password: validateStrongPassword(trimmedForm.password),
      confirmPassword: validateConfirmPassword(trimmedForm.password, trimmedForm.confirmPassword),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    try {
      await register(trimmedForm.name, trimmedForm.email, trimmedForm.password);
      navigate('/dashboard');
    } catch {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = form.password ? getPasswordStrength(form.password) : null;

  return (
    <AuthLayout>
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <img src="/logo.svg" alt="Self Sync" className="w-8 h-8" />
          <span className="text-xl font-bold font-display text-surface-900 dark:text-surface-50">
            Self <span className="text-primary-600">Sync</span>
          </span>
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50 mb-2"
        >
          Create your account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-surface-500 dark:text-surface-400"
        >
          Start your interview preparation journey.
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          icon={User}
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          {passwordStrength && (
            <div className="mt-2 space-y-1">
              <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    passwordStrength.color === 'red' ? 'bg-red-500' :
                    passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${passwordStrength.percentage}%` }}
                />
              </div>
              <p className={`text-xs font-medium ${
                passwordStrength.color === 'red' ? 'text-red-500' :
                passwordStrength.color === 'yellow' ? 'text-yellow-500' :
                'text-green-500'
              }`}>
                Password strength: {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 mt-0.5 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="terms" className="text-sm text-surface-500 dark:text-surface-400">
            I agree to the{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full" loading={loading} icon={UserPlus}>
          Create Account
        </Button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

