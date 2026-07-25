import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, padding = true, onClick, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`card ${padding ? 'p-6' : ''} ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StatCard = ({ icon: Icon, label, value, trend, color = 'primary', onClick }) => {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  };

  return (
    <Card
      hover
      className={`${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${colorClasses[color] || colorClasses.primary}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm text-surface-500 dark:text-surface-400">{label}</p>
        <p className="text-2xl font-bold font-display text-surface-900 dark:text-surface-50">
          {value}
        </p>
        {trend && (
          <p className="text-xs text-surface-400">{trend}</p>
        )}
      </div>
    </Card>
  );
};

