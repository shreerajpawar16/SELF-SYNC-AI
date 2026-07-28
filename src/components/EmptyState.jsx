import { memo } from 'react';
import { motion } from 'framer-motion';
import { Inbox, FileText, BarChart3, Bell, BookOpen, Target } from 'lucide-react';
import { Card } from './Card';

const icons = {
  history: Inbox,
  reports: BarChart3,
  practice: BookOpen,
  notifications: Bell,
  default: FileText,
};

export const EmptyState = memo(({ type = 'default', title, description, action, actionText, onAction }) => {
  const Icon = icons[type] || icons.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center"
    >
      <Card className="p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 flex items-center justify-center">
          <Icon className="w-10 h-10 text-primary-500 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-50 mb-2">
          {title || 'Nothing here yet'}
        </h3>
        <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-6">
          {description || 'Start by completing your first interview or practice session.'}
        </p>
        {action && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]"
          >
            <Target className="w-4 h-4" />
            {actionText || 'Get Started'}
          </button>
        )}
      </Card>
    </motion.div>
  );
});

EmptyState.displayName = 'EmptyState';

