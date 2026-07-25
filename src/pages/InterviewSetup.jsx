import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Settings2, ArrowRight, AlertCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Select } from '../components/Input';
import {
  JOB_ROLES, EXPERIENCE_LEVELS, INTERVIEW_TYPES,
  PROGRAMMING_LANGUAGES, DIFFICULTY_LEVELS, DURATIONS
} from '../utils/constants';

export const InterviewSetup = () => {
  const navigate = useNavigate();
  const [setup, setSetup] = useState({
    jobRole: '',
    experienceLevel: '',
    interviewType: '',
    programmingLanguage: '',
    difficulty: '',
    duration: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetup((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const isFormValid = Object.values(setup).every(Boolean);

  const handleStart = () => {
    if (!isFormValid) {
      const newErrors = {};
      Object.entries(setup).forEach(([key, value]) => {
        if (!value) newErrors[key] = 'This field is required';
      });
      setErrors(newErrors);
      return;
    }
    navigate('/interview/session', { state: { setup } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Interview Setup</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Configure your interview parameters to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Setup Form */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
              <Settings2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Interview Configuration</h2>
              <p className="text-sm text-surface-400">Fill in all details to begin</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="Job Role"
              name="jobRole"
              value={setup.jobRole}
              onChange={handleChange}
              error={errors.jobRole}
              required
            >
              <option value="">Select a role</option>
              {JOB_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>

            <Select
              label="Experience Level"
              name="experienceLevel"
              value={setup.experienceLevel}
              onChange={handleChange}
              error={errors.experienceLevel}
              required
            >
              <option value="">Select experience</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </Select>

            <Select
              label="Interview Type"
              name="interviewType"
              value={setup.interviewType}
              onChange={handleChange}
              error={errors.interviewType}
              required
            >
              <option value="">Select type</option>
              {INTERVIEW_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>

            <Select
              label="Programming Language"
              name="programmingLanguage"
              value={setup.programmingLanguage}
              onChange={handleChange}
              error={errors.programmingLanguage}
              required
            >
              <option value="">Select language</option>
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </Select>

            <Select
              label="Difficulty"
              name="difficulty"
              value={setup.difficulty}
              onChange={handleChange}
              error={errors.difficulty}
              required
            >
              <option value="">Select difficulty</option>
              {DIFFICULTY_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </Select>

            <Select
              label="Duration"
              name="duration"
              value={setup.duration}
              onChange={handleChange}
              error={errors.duration}
              required
            >
              <option value="">Select duration</option>
              {DURATIONS.map((dur) => (
                <option key={dur} value={dur}>{dur}</option>
              ))}
            </Select>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
            <Button
              variant="primary"
              className="w-full"
              icon={ArrowRight}
              disabled={!isFormValid}
              onClick={handleStart}
              size="lg"
            >
              Start Interview
            </Button>
            {!isFormValid && (
              <p className="text-xs text-surface-400 text-center mt-2">
                Please fill in all fields to enable the start button
              </p>
            )}
          </div>
        </Card>

        {/* Preview Panel */}
        <Card className="p-6 gradient-bg text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Interview Session</h3>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-300 mt-0.5">•</span>
                <span>Adaptive questions based on your profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-300 mt-0.5">•</span>
                <span>Real-time AI evaluation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-300 mt-0.5">•</span>
                <span>Detailed performance report</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-300 mt-0.5">•</span>
                <span>Track your improvement over time</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-blue-200/60">
                Estimated time: {setup.duration || '15-60'} minutes
              </p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

