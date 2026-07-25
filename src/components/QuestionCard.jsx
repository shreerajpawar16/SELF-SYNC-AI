import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, SkipForward, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { Button } from './Button';

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  questionText,
  onAnswer,
  onSkip,
  onPrevious,
  onNext,
  onEnd,
  timerDuration,
  timerRunning,
  showNavigation = true,
  showTimer = true,
  showProgress = true,
  isLastQuestion = false,
  isLoading = false,
  placeholder = 'Type your answer here...',
}) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) {
      setError('Please provide an answer before proceeding.');
      return;
    }
    setError('');
    onAnswer?.(answer);
    setAnswer('');
  };

  const handleSkip = () => {
    setAnswer('');
    setError('');
    onSkip?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Progress & Timer */}
      <div className="flex items-center justify-between gap-4">
        {showProgress && (
          <ProgressBar
            current={questionNumber}
            total={totalQuestions}
            className="flex-1"
          />
        )}
        {showTimer && (
          <Timer
            duration={timerDuration}
            running={timerRunning}
            className="shrink-0"
          />
        )}
      </div>

      {/* Question Card */}
      <div className="card p-6 md:p-8">
        <div className="space-y-1 mb-4">
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Question {questionNumber + 1}
          </span>
          {question && (
            <span className="text-xs text-surface-400 ml-2">{question}</span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-surface-50 leading-relaxed">
          {questionText}
        </h3>
      </div>

      {/* Answer Area */}
      <div className="card p-6">
        <label className="label-text mb-3">Your Answer</label>
        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-field min-h-[160px] resize-y mb-4"
          disabled={isLoading}
        />
        {error && (
          <p className="error-text flex items-center gap-1.5 mb-4">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {showNavigation && questionNumber > 0 && (
              <Button
                variant="ghost"
                size="sm"
                icon={ChevronLeft}
                onClick={onPrevious}
                disabled={isLoading}
              >
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon={SkipForward}
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip
            </Button>
            {!isLastQuestion ? (
              <Button
                variant="primary"
                size="sm"
                icon={ChevronRight}
                onClick={handleSubmit}
                loading={isLoading}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={handleSubmit}
                loading={isLoading}
              >
                Submit
              </Button>
            )}
            {showNavigation && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEnd}
                disabled={isLoading}
              >
                End Interview
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

