import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase, Brain, BarChart3, ArrowRight, Clock, Award, BookOpen, Target
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { getGreeting } from '../utils/helpers';
import { EmptyState } from '../components/EmptyState';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader type="dashboard" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">
          Welcome to Self Sync
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          {user?.name ? `Hello, ${user.name.split(' ')[0]}! ` : ''}
          Complete your first Practice Session or AI Mock Interview to unlock analytics and reports.
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Start Card */}
        <Card className="lg:col-span-2 p-6 gradient-bg text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <Target className="w-10 h-10 text-blue-200 mb-4" />
            <h2 className="text-2xl font-bold font-display mb-2">Ready for a challenge?</h2>
            <p className="text-blue-100/80 max-w-md mb-6">
              Start your first AI mock interview and get personalized feedback.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="lime"
                icon={ArrowRight}
                onClick={() => navigate('/interview')}
              >
                Start Interview
              </Button>
              <Button
                variant="ghost"
                className="text-white border-white/20 hover:bg-white/10"
                icon={Brain}
                onClick={() => navigate('/practice')}
              >
                Practice
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={Brain}
                onClick={() => navigate('/practice')}
              >
                Practice Weak Skills
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={BarChart3}
                onClick={() => navigate('/reports')}
              >
                View Reports
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={Clock}
                onClick={() => navigate('/history')}
              >
                Interview History
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Interviews - empty state until backend is connected */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Recent Interviews</h3>
            <p className="text-sm text-surface-400">Your latest interview sessions will appear here</p>
          </div>
        </div>
        <EmptyState
          type="history"
          title="No interviews yet"
          description="You haven't completed any interviews yet. Complete your first Practice Session or AI Mock Interview to unlock analytics and reports."
          action
          actionText="Start Interview"
          onAction={() => navigate('/interview')}
        />
      </Card>
    </motion.div>
  );
};

