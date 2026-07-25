import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
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
      email: form.email.trim(),
      password: form.password,
    };
    setForm(trimmedForm);
    
    const newErrors = {
      email: validateEmail(trimmedForm.email),
      password: validatePassword(trimmedForm.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    try {
      await login(trimmedForm.email, trimmedForm.password);
      navigate('/dashboard');
    } catch {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

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
          Welcome back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-surface-500 dark:text-surface-400"
        >
          Log in to continue your practice journey.
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
            placeholder="Enter your password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <div className="flex justify-end mt-1">
            <Link
              to="/forgot-password"
              className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="remember" className="text-sm text-surface-600 dark:text-surface-400">
            Remember me
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full" loading={loading} icon={ArrowRight}>
          Sign In
        </Button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

