import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';

export const History = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Interview History</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Track all your interview sessions and progress.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/interview')}>
          New Interview
        </Button>
      </div>

      {/* Empty State - backend not yet connected */}
      <Card className="p-6">
        <EmptyState
          type="history"
          title="No interview history available"
          description="No interview history available. Complete your first interview to see your history here. Once the backend is connected, your past sessions will be listed here with search, sort, and pagination."
          action
          actionText="Start Interview"
          onAction={() => navigate('/interview')}
        />
      </Card>
    </motion.div>
  );
};

