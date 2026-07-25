import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Full-screen mode for interview session and loading
  const isFullscreen = location.pathname === '/interview/session' ||
    location.pathname === '/interview/loading';

  // Compact mode for interview setup
  const isCompact = location.pathname === '/interview';

  if (isFullscreen) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showSidebarToggle={false} />
        <main className="min-h-[calc(100vh-64px)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={`flex-1 min-h-[calc(100vh-64px)] ${isCompact ? '' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

