import api from './api';

/**
 * Profile Service
 * Manages user profile data, skills, and resume uploads.
 * Backend team: Implement these endpoints in the profile controller.
 */

export const profileService = {
  /**
   * GET /api/profile
   * Get authenticated user's full profile
   * @returns {Promise} { name, email, skills, experience, bio, resumeUrl, avatar }
   */
  get: () => api.get('/profile'),

  /**
   * PUT /api/profile
   * Update user profile information
   * @param {Object} data - { name, skills, experience, bio }
   * @returns {Promise} { name, email, skills, experience, bio, message }
   */
  update: (data) => api.put('/profile', data),

  /**
   * POST /api/profile/avatar
   * Upload profile avatar image
   * @param {FormData} formData - containing the image file
   * @returns {Promise} { avatarUrl: string }
   */
  uploadAvatar: (formData) => api.post('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  /**
   * POST /api/profile/resume
   * Upload resume file
   * @param {FormData} formData - containing the resume file
   * @returns {Promise} { resumeUrl: string }
   */
  uploadResume: (formData) => api.post('/profile/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  /**
   * PUT /api/profile/password
   * Change user password
   * @param {Object} data - { currentPassword, newPassword }
   * @returns {Promise} { message: string }
   */
  changePassword: (data) => api.put('/profile/password', data),
};

export default profileService;

