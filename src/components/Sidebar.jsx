import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Brain,
  Video,
  History,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Brain, label: 'Practice', path: '/practice' },
  { icon: Video, label: 'Interview', path: '/interview' },
  { icon: History, label: 'History', path: '/history' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

const sidebarBottom = [
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <AnimatePresence>
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: isOpen ? 0 : -280 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed lg:sticky top-16 left-0 z-30 lg:z-0 w-[260px] h-[calc(100vh-64px)] bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 overflow-y-auto ${
            isOpen ? '' : 'lg:translate-x-0 lg:block'
          } ${!isOpen ? 'hidden lg:block' : ''}`}
        >
          <div className="flex flex-col h-full py-4">
            {/* Main Navigation */}
            <div className="px-3 space-y-1 flex-1">
              <p className="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">
                Menu
              </p>
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="px-3 pt-4 border-t border-surface-200 dark:border-surface-700 space-y-1">
              <p className="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">
                Account
              </p>
              {sidebarBottom.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

