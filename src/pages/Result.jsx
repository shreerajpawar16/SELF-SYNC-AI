import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, Brain } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Result = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-primary-600" />
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Interview Results</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Performance Report</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Your detailed interview evaluation will appear here once the backend evaluation engine is connected.
          </p>
        </div>
      </motion.div>

      {/* Empty State - Backend not connected */}
      <Card className="p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 flex items-center justify-center">
          <Brain className="w-10 h-10 text-primary-500 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-50 mb-3">
          Results Pending Backend Integration
        </h2>
        <p className="text-surface-500 dark:text-surface-400 max-w-lg mx-auto leading-relaxed mb-4">
          Your interview has been completed. Once the backend AI evaluation engine is connected, 
          this page will display your performance report including:
        </p>
        <div className="max-w-sm mx-auto text-left space-y-2 mb-8">
          {[
            'Overall score and interview readiness',
            'Skill-wise performance breakdown',
            'Strengths and areas for improvement',
            'Recommended topics to focus on',
            'Question-wise analysis with feedback',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-surface-500 dark:text-surface-400">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" icon={Brain} size="lg" onClick={() => navigate('/practice')}>
            Practice Weak Skills
          </Button>
          <Button variant="outline" icon={ArrowLeft} size="lg" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

