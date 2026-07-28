import api from './api';

/**
 * Authentication Service
 * Handles user login, registration, and token management.
 * Backend team: Implement these endpoints in the auth controller.
 */

export const authService = {
  /**
   * POST /api/auth/login
   * Authenticate user and return JWT token
   * @param {string} email
   * @param {string} password
   * @returns {Promise} { token, user: { name, email } }
   */
  login: (email, password) => api.post('/auth/login', { email, password }),

  /**
   * POST /api/auth/register
   * Create new user account
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise} { token, user: { name, email } }
   */
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),

  /**
   * GET /api/auth/me
   * Get currently authenticated user profile
   * @returns {Promise} { name, email, skills, experience, avatar }
   */
  getProfile: () => api.get('/auth/me'),
};

export default authService;

