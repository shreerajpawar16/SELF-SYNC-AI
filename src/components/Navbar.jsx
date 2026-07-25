import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Moon, Sun, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getInitials, getAvatarUrl } from '../utils/helpers';

export const Navbar = ({ onMenuToggle, showSidebarToggle = true }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isDashboardPage = !isLandingPage && !isAuthPage;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Self Sync" className="w-8 h-8" />
            <span className="text-xl font-bold font-display text-surface-900 dark:text-surface-50">
              Self <span className="text-primary-600">Sync</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLandingPage && (
              <>
                <Link to="/login" className="btn-ghost text-sm">Log in</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
              </>
            )}

            {isAuthenticated && isDashboardPage && (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun className="w-5 h-5 text-surface-400" /> : <Moon className="w-5 h-5 text-surface-500" />}
                </button>

                <button className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative">
                  <Bell className="w-5 h-5 text-surface-500" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    <img
                      src={getAvatarUrl(user?.name)}
                      alt={user?.name}
                      className="w-8 h-8 rounded-lg"
                    />
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300 max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-surface-400" />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-surface-200 dark:border-surface-700 py-2"
                      >
                        <div className="px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                          <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">{user?.name}</p>
                          <p className="text-xs text-surface-400">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                        >
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <hr className="my-1 border-surface-200 dark:border-surface-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Mobile menu toggle for dashboard */}
            {isAuthenticated && isDashboardPage && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <Menu className="w-5 h-5 text-surface-500" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {isAuthenticated && isDashboardPage && (
              <button onClick={toggleTheme} className="p-2">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            {isLandingPage && (
              <Link to="/login" className="btn-ghost text-sm">Log in</Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
          >
            <div className="px-4 py-4 space-y-2">
              {isLandingPage && (
                <>
                  <Link to="/login" className="block px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  <Link to="/register" className="block px-4 py-3 rounded-xl bg-primary-600 text-white text-center font-semibold" onClick={() => setMobileMenuOpen(false)}>Get Started Free</Link>
                </>
              )}
              {isAuthenticated && isDashboardPage && (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                    <img src={getAvatarUrl(user?.name)} alt="" className="w-10 h-10 rounded-lg" />
                    <div>
                      <p className="font-semibold text-surface-900 dark:text-surface-50">{user?.name}</p>
                      <p className="text-xs text-surface-400">{user?.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                  <Link to="/settings" className="block px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Sign Out</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

