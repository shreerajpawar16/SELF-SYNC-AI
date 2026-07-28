import api from './api';

/**
 * Report Service
 * Provides analytics, reports, and performance tracking data.
 * Backend team: Implement these endpoints in the report controller.
 */

export const reportService = {
  /**
   * GET /api/reports/overview
   * Get overall performance summary
   * @returns {Promise} { totalInterviews, averageScore, totalPracticeTime, skillCoverage }
   */
  getOverview: () => api.get('/reports/overview'),

  /**
   * GET /api/reports/trends
   * Get performance trends over time
   * @param {string} period - 'weekly' | 'monthly' | 'yearly'
   * @returns {Promise} { trends: Array<{ date, score, type }> }
   */
  getTrends: (period = 'monthly') => api.get(`/reports/trends?period=${period}`),

  /**
   * GET /api/reports/skills
   * Get skill-wise performance breakdown
   * @returns {Promise} { skills: Array<{ name, score, totalAttempts, trend }> }
   */
  getSkillBreakdown: () => api.get('/reports/skills'),
};

export default reportService;

