import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { interviewAPI } from '../services/api';

export const AIInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setup = location.state?.setup;

  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if no setup
  useEffect(() => {
    if (!setup) {
      navigate('/interview', { replace: true });
      return;
    }
  }, [setup, navigate]);

  // Fetch questions from backend
  useEffect(() => {
    if (!setup) return;

    const fetchQuestions = async () => {
      setIsLoadingQuestion(true);
      setError(null);
      try {
        const res = await interviewAPI.start({
          jobRole: setup.jobRole,
          experienceLevel: setup.experienceLevel,
          interviewType: setup.interviewType,
          programmingLanguage: setup.programmingLanguage,
          difficulty: setup.difficulty,
          duration: setup.duration,
        });
        if (res && res.questions) {
          // Backend connected successfully - questions will be displayed
          // This UI will be updated once backend returns actual questions
        } else {
          throw new Error('No questions received from backend');
        }
      } catch {
        setError('Failed to load questions. Please ensure the backend server is running and try again.');
      } finally {
        setIsLoadingQuestion(false);
      }
    };
    fetchQuestions();
  }, [setup, navigate]);

  if (!setup) return null;

  if (isLoadingQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-surface-500">Loading interview questions from backend...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <EmptyState
          type="default"
          title="Unable to start interview"
          description={error}
          action
          actionText="Back to Setup"
          onAction={() => navigate('/interview')}
        />
      </motion.div>
    );
  }

  // Placeholder until backend delivers actual questions
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <EmptyState
        type="default"
        title="Waiting for questions"
        description="The interview questions will appear here once the backend delivers them. Please ensure the backend server is connected."
        action
        actionText="Back to Setup"
        onAction={() => navigate('/interview')}
      />
    </motion.div>
  );
};

