import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/Card';

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Wait for backend to process and return evaluation results
    // This loading state will persist until the backend responds
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Navigate to result when backend evaluation is complete
  useEffect(() => {
    if (isComplete) {
      const redirectTimer = setTimeout(() => {
        navigate('/interview/result', {
          state: {
            answers: state?.answers || [],
            setup: state?.setup,
            totalQuestions: state?.totalQuestions || 0,
          },
        });
      }, 500);
      return () => clearTimeout(redirectTimer);
    }
  }, [isComplete, navigate, state]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto w-full"
      >
        <Card className="p-10 lg:p-14">
          {/* Animated Icon */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600 rounded-3xl"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {!isComplete ? (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-green-300" />
                </motion.div>
              )}
            </div>

            {/* Outer ring pulse */}
            <motion.div
              className="absolute -inset-3 rounded-3xl border-2 border-primary-500/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <motion.h2
            className="text-3xl lg:text-4xl font-bold font-display text-surface-900 dark:text-surface-50 mb-2"
            animate={isComplete ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {isComplete ? 'Analysis Complete!' : 'Interview Completed'}
          </motion.h2>
          <p className="text-surface-500 dark:text-surface-400 mb-10">
            {isComplete
              ? 'Your results are ready.'
              : 'Preparing your results from the backend...'}
          </p>

          {/* Simple loading indicator */}
          {!isComplete && (
            <div className="flex justify-center gap-1.5">
              <motion.span
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.span
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

