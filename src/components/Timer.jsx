import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

export const Timer = ({ duration = 0, onTimeUp, running = false, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLow = timeLeft > 0 && timeLeft <= 60;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className={`w-4 h-4 ${isLow ? 'text-red-500' : 'text-surface-400'}`} />
      <span
        className={`font-mono font-semibold text-sm ${
          isLow ? 'text-red-500 animate-pulse' : 'text-surface-600 dark:text-surface-300'
        }`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

