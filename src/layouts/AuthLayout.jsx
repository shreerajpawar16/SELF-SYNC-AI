import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const AuthLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <img src="/logo.svg" alt="Self Sync" className="w-10 h-10" />
              <span className="text-2xl font-bold font-display text-white">
                Self <span className="text-blue-200">Sync</span>
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold font-display text-white leading-tight mb-6">
                Master Your Interviews<br />
                <span className="text-blue-200">with AI</span>
              </h1>
              <p className="text-lg text-blue-100/80 max-w-lg leading-relaxed">
                Practice technical and HR interviews with intelligent AI feedback and improve your confidence.
              </p>
            </motion.div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-100/70">
              <div className="w-8 h-px bg-blue-200/30" />
              <span className="text-sm">AI-Powered Practice</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100/70">
              <div className="w-8 h-px bg-blue-200/30" />
              <span className="text-sm">Personalized Feedback</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100/70">
              <div className="w-8 h-px bg-blue-200/30" />
              <span className="text-sm">Track Your Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-surface-900">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

