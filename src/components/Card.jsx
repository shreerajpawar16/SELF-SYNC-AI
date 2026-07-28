import { memo } from 'react';
import { motion } from 'framer-motion';

export const Card = memo(({
  children,
  className = '',
  hover = false,
  padding = true,
  onClick,
  ...props
}) => {
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
});

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'primary',
  onClick
}) => {
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
      className={onClick ? 'cursor-pointer' : ''}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p className="text-sm text-green-500 mt-1">
              {trend}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${colorClasses[color] || colorClasses.primary}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

Card.displayName = 'Card';
StatCard.displayName = 'StatCard';