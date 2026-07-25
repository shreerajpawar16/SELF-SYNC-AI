import { motion } from 'framer-motion';

export const ProgressBar = ({ progress = 0, total = 1, current = 0, className = '' }) => {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-surface-500 dark:text-surface-400 font-medium">
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-primary-600 dark:text-primary-400 font-semibold">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
        />
      </div>
    </div>
  );
};

