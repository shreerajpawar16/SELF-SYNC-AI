import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, Code, FileText, MessageSquareMore, BarChart3, Target,
  ChevronDown, CheckCircle2, Sparkles
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FAQ_DATA } from '../utils/constants';

const features = [
  { icon: Brain, title: 'AI Mock Interviews', description: 'Realistic interview simulations powered by advanced AI that adapts to your responses.' },
  { icon: Code, title: 'Coding Interviews', description: 'Practice coding challenges with real-time AI evaluation and detailed feedback.' },
  { icon: FileText, title: 'Resume-based Questions', description: 'Get personalized questions generated from your resume and skill set.' },
  { icon: MessageSquareMore, title: 'Detailed Feedback', description: 'Receive comprehensive feedback on your answers, structure, and delivery.' },
  { icon: BarChart3, title: 'Performance Analytics', description: 'Track your progress with detailed analytics and performance trends.' },
  { icon: Target, title: 'Practice Weak Skills', description: 'Identify and focus on areas that need improvement with targeted practice.' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950">
      {/* Custom Navbar for landing */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Self Sync" className="w-8 h-8" />
              <span className="text-xl font-bold font-display text-surface-900 dark:text-surface-50">
                Self <span className="text-primary-600">Sync</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-ghost text-sm">Log in</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-surface-900 dark:via-surface-950 dark:to-primary-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Interview Preparation
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-surface-900 dark:text-surface-50 leading-[1.05] tracking-tight mb-6">
              Master Your Interviews
              <span className="block gradient-text">with AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice technical and HR interviews with intelligent AI feedback 
              and improve your confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Start Now
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center justify-center gap-8 text-sm text-surface-400"
            >
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free to start</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cancel anytime</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Comprehensive tools to help you prepare for every aspect of your interview.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card hover className="p-6 h-full">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Everything you need to know about Self Sync.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-surface-900 dark:text-surface-50">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-surface-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === index && (
                    <p className="mt-3 text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">
              Ready to ace your next interview?
            </h2>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-10">
              Join thousands of professionals who are already preparing with Self Sync.
              Start your journey today.
            </p>
            <Link to="/register">
              <Button variant="lime" size="lg" icon={ArrowRight}>
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
