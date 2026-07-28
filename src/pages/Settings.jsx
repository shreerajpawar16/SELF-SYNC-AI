import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Shield, LogOut, Save, KeyRound } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ConfirmationDialog } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async () => {
    setSaving(true);
    // Backend will handle password update when connected via API
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Settings</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Manage your preferences and account settings.
        </p>
      </div>

      {/* Theme */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
              {isDark ? (
                <Moon className="w-5 h-5 text-primary-600" />
              ) : (
                <Sun className="w-5 h-5 text-primary-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50">Theme</h3>
              <p className="text-sm text-surface-400">{isDark ? 'Dark mode is active' : 'Light mode is active'}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              isDark ? 'bg-primary-600' : 'bg-surface-300'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                isDark ? 'translate-x-7.5' : 'translate-x-0.5'
              }`}
            >
              {isDark ? (
                <Moon className="w-3 h-3 text-primary-600" />
              ) : (
                <Sun className="w-3 h-3 text-yellow-500" />
              )}
            </span>
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
            <Bell className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-surface-50">Notifications</h3>
            <p className="text-sm text-surface-400">Choose what notifications you receive</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', desc: 'Get updates about interview tips and progress' },
            { key: 'push', label: 'Push notifications', desc: 'Receive reminders for practice sessions' },
            { key: 'sms', label: 'SMS notifications', desc: 'Get critical updates via text message' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{item.label}</p>
                <p className="text-xs text-surface-400">{item.desc}</p>
              </div>
              <label className="relative cursor-pointer" aria-label={`Toggle ${item.label}`}>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
            <KeyRound className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-surface-50">Change Password</h3>
            <p className="text-sm text-surface-400">Update your account password</p>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            icon={Shield}
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            icon={KeyRound}
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            icon={KeyRound}
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
          />
          <Button
            variant="primary"
            icon={Save}
            loading={saving}
            onClick={handleSavePassword}
          >
            Update Password
          </Button>
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-6 border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-red-50 dark:bg-red-900/30 rounded-xl">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50">Logout</h3>
              <p className="text-sm text-surface-400">Sign out of your account</p>
            </div>
          </div>
          <Button
            variant="danger"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Logout
          </Button>
        </div>
      </Card>

      {showLogoutConfirm && (
        <ConfirmationDialog
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Logout Confirmation"
          message="Are you sure you want to logout? You'll need to sign in again to access your account."
          confirmText="Yes, Logout"
          cancelText="Cancel"
          variant="danger"
        />
      )}
    </motion.div>
  );
};

