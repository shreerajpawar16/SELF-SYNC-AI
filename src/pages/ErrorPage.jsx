import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, WifiOff } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const ErrorPage = ({ type = 'error', message, onRetry }) => {
  const navigate = useNavigate();

  const config = {
    error: {
      icon: AlertTriangle,
      title: 'Something went wrong',
      gradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
      iconColor: 'text-red-500',
    },
    network: {
      icon: WifiOff,
      title: 'Network Error',
      gradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
      iconColor: 'text-orange-500',
    },
    server: {
      icon: AlertTriangle,
      title: 'Server Error',
      gradient: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
      iconColor: 'text-red-500',
    },
  };

  const current = config[type] || config.error;
  const Icon = current.icon;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <Card className="p-12">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${current.gradient} flex items-center justify-center`}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className={`w-12 h-12 ${current.iconColor}`} />
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-50 mb-2">
            {current.title}
          </h2>
          <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-8">
            {message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                variant="primary"
                icon={RefreshCw}
                onClick={onRetry}
              >
                Try Again
              </Button>
            )}
            <Button
              variant="outline"
              icon={Home}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

