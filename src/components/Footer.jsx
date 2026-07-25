import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold font-display text-white">
                Self <span className="text-primary-400">Sync</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm max-w-md leading-relaxed">
              AI-powered mock interview platform that helps you prepare for technical and behavioral interviews with intelligent feedback and performance analytics.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="text-sm text-surface-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-sm text-surface-400 hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/practice" className="text-sm text-surface-400 hover:text-white transition-colors">Practice</Link></li>
              <li><Link to="/interview" className="text-sm text-surface-400 hover:text-white transition-colors">Mock Interview</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-surface-500">
          <p>&copy; {currentYear} Self Sync. All rights reserved.</p>
          <p>Built with AI for interview practice.</p>
        </div>
      </div>
    </footer>
  );
};

