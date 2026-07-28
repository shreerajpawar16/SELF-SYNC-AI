import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, TrendingUp, ChevronDown } from 'lucide-react';

export const ScoreCircle = ({ score, size = 'lg', label }) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-xl',
    md: 'w-28 h-28 text-2xl',
    lg: 'w-36 h-36 text-3xl',
    xl: 'w-44 h-44 text-4xl',
  };

  const getColor = (s) => {
    if (s >= 80) return 'from-green-400 to-emerald-500';
    if (s >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-surface-200 dark:text-surface-700"
          />
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            strokeWidth="2"
            stroke="url(#scoreGradient)"
            strokeDasharray={`${score * 1.0048} 100.48`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="scoreGradient">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center font-bold font-display ${sizeClasses[size].split(' ').slice(2).join(' ')} text-surface-900 dark:text-surface-50`}>
          {score}%
        </div>
      </div>
      {label && (
        <span className="text-sm text-surface-500 dark:text-surface-400 font-medium">{label}</span>
      )}
    </div>
  );
};

export const SkillBar = ({ name, score, maxScore = 100 }) => {
  const percentage = Math.min(100, (score / maxScore) * 100);

  const getBarColor = (p) => {
    if (p >= 80) return 'bg-green-500';
    if (p >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-surface-700 dark:text-surface-300 font-medium">{name}</span>
        <span className="text-surface-500 dark:text-surface-400">{score}%</span>
      </div>
      <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${getBarColor(percentage)}`}
        />
      </div>
    </div>
  );
};

export const FeedbackCard = ({ type, items }) => {
  const config = {
    strength: {
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      title: 'Strengths',
    },
    improvement: {
      icon: Lightbulb,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      title: 'Areas for Improvement',
    },
    missing: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      title: 'Missing Concepts',
    },
  };

  const { icon: Icon, color, bg, title } = config[type] || config.strength;

  return (
    <div className={`${bg} rounded-xl p-4 space-y-3`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <h4 className="font-semibold text-surface-900 dark:text-surface-50">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items?.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-400">
            <span className="mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ExpandableQuestion = ({ question, userAnswer, expectedAnswer, missingConcepts, feedback, defaultOpen = false }) => {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <div>
            <p className="font-medium text-surface-900 dark:text-surface-50 text-sm">{question}</p>
            <p className="text-xs text-surface-400 mt-0.5">Click to expand review</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: defaultOpen ? 180 : 0 }}
          className="text-surface-400 group-open:rotate-180 transition-transform"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </summary>
      <div className="mt-3 space-y-3 px-4">
        {userAnswer && (
          <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
            <p className="text-xs font-semibold text-surface-500 mb-1">Your Answer:</p>
            <p className="text-sm text-surface-700 dark:text-surface-300">{userAnswer}</p>
          </div>
        )}
        {expectedAnswer && (
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-xs font-semibold text-green-600 mb-1">Expected Answer:</p>
            <p className="text-sm text-green-700 dark:text-green-300">{expectedAnswer}</p>
          </div>
        )}
        {missingConcepts && missingConcepts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {missingConcepts.map((concept, i) => (
              <span key={i} className="px-2.5 py-1 text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {concept}
              </span>
            ))}
          </div>
        )}
        {feedback && (
          <p className="text-sm text-surface-500 dark:text-surface-400 italic">{feedback}</p>
        )}
      </div>
    </details>
  );
};



