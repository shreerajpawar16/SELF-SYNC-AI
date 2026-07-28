import api from './api';

/**
 * Dashboard Service
 * Provides statistics and overview data for the dashboard page.
 * Backend team: Implement these endpoints in the dashboard controller.
 */

export const dashboardService = {
  /**
   * GET /api/dashboard
   * Get dashboard statistics for the authenticated user
   * @returns {Promise} {
   *   totalInterviews: number,
   *   averageScore: number,
   *   weakSkills: string[],
   *   recentActivity: Array
   * }
   */
  getStats: () => api.get('/dashboard'),
};

export default dashboardService;

