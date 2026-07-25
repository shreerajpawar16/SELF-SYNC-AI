import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';

export const Reports = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Reports</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Detailed analytics of your interview performance.
        </p>
      </div>

      <EmptyState
        type="reports"
        title="No reports available yet"
        description="Complete your first interview to generate your AI evaluation report. Analytics will appear after your first completed interview once the backend is connected."
        action
        actionText="Start Interview"
        onAction={() => navigate('/interview')}
      />
    </motion.div>
  );
};

