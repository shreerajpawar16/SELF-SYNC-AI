import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, ArrowRight, Target, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { TECHNOLOGIES } from '../utils/constants';

export const Practice = () => {
  const navigate = useNavigate();
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTech = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const startPractice = async () => {
    if (selectedTechs.length === 0) {
      toast.error('Please select at least one technology');
      return;
    }
    setIsLoading(true);
    // Backend will generate and return questions based on selected technologies.
    // This placeholder shows a loading state until the backend API is integrated.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    toast.success('Practice session ready!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Practice Module</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Select technologies you're weak in and practice with targeted questions.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-[40vh]"
          >
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin mx-auto mb-4" />
              <p className="text-surface-500">Connecting to practice question bank...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 lg:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">
                    Which technologies are you weak in?
                  </h2>
                  <p className="text-sm text-surface-400 mt-1">
                    Select one or more technologies you want to practice and improve.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {TECHNOLOGIES.map((tech) => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <motion.button
                      key={tech}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTech(tech)}
                      className={`relative p-4 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
                        isSelected
                          ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-300 shadow-md shadow-primary-500/10'
                          : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300 dark:hover:border-surface-600 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary-500" />
                        </motion.div>
                      )}
                      <span className="font-semibold">{tech}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-surface-200 dark:border-surface-700">
                <div>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
                    {selectedTechs.length} technology{selectedTechs.length !== 1 ? 'ies' : ''} selected
                  </p>
                  {selectedTechs.length > 0 && (
                    <p className="text-xs text-surface-400 mt-0.5">
                      Questions will be tailored to your selection
                    </p>
                  )}
                </div>
                <Button
                  variant="primary"
                  icon={ArrowRight}
                  size="lg"
                  disabled={selectedTechs.length === 0 || isLoading}
                  loading={isLoading}
                  onClick={startPractice}
                >
                  Start Practice
                </Button>
              </div>
            </Card>

            {selectedTechs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="p-10 text-center">
                  <Brain className="w-14 h-14 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Ready to improve?
                  </h3>
                  <p className="text-sm text-surface-400 max-w-md mx-auto">
                    Choose at least one technology above to start practicing. We'll generate questions tailored to your weak areas.
                  </p>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

