import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <Card className="p-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Compass className="w-12 h-12 text-amber-500" />
            </motion.div>
          </div>

          <h1 className="text-6xl font-bold font-display text-surface-900 dark:text-surface-50 mb-2">
            404
          </h1>
          <p className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">
            Page not found
          </p>
          <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              icon={Home}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              icon={ArrowLeft}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

