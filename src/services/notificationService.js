import api from './api';

/**
 * Notification Service
 * Manages user notifications and preferences.
 * Backend team: Implement these endpoints in the notification controller.
 */

export const notificationService = {
  /**
   * GET /api/notifications
   * Get all notifications for the authenticated user
   * @returns {Promise} { notifications: Array<{ id, type, title, message, read, createdAt }> }
   */
  getAll: () => api.get('/notifications'),

  /**
   * PUT /api/notifications/:id/read
   * Mark a single notification as read
   * @param {string} id - Notification ID
   * @returns {Promise} { message: string }
   */
  markAsRead: (id) => api.put(`/notifications/${id}/read`),

  /**
   * PUT /api/notifications/read-all
   * Mark all notifications as read
   * @returns {Promise} { message: string }
   */
  markAllAsRead: () => api.put('/notifications/read-all'),

  /**
   * GET /api/notifications/preferences
   * Get notification preferences
   * @returns {Promise} { email: boolean, push: boolean, sms: boolean }
   */
  getPreferences: () => api.get('/notifications/preferences'),

  /**
   * PUT /api/notifications/preferences
   * Update notification preferences
   * @param {Object} preferences - { email, push, sms }
   * @returns {Promise} { message: string }
   */
  updatePreferences: (preferences) => api.put('/notifications/preferences', preferences),
};

export default notificationService;

