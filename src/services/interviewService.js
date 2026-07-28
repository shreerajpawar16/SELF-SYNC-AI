import api from './api';

/**
 * Interview Service
 * Manages AI interview sessions, questions, and answer submissions.
 * Backend team: Implement these endpoints in the interview controller.
 */

export const interviewService = {
  /**
   * POST /api/interview/start
   * Start a new interview session
   * @param {Object} setup - { jobRole, experienceLevel, interviewType, programmingLanguage, difficulty, duration }
   * @returns {Promise} { sessionId, totalQuestions, questions: Array }
   */
  start: (setup) => api.post('/interview/start', setup),

  /**
   * GET /api/interview/question
   * Get the next interview question
   * @returns {Promise} { questionId, questionText, questionType, keywords }
   */
  getQuestion: () => api.get('/interview/question'),

  /**
   * POST /api/interview/answer
   * Submit answer to current question
   * @param {string} questionId
   * @param {string} answer
   * @returns {Promise} { score, feedback, nextQuestion }
   */
  submitAnswer: (questionId, answer) => api.post('/interview/answer', { questionId, answer }),

  /**
   * POST /api/interview/end
   * End the current interview session
   * @returns {Promise} { sessionId, status, message }
   */
  end: () => api.post('/interview/end'),

  /**
   * GET /api/interview/result/:sessionId
   * Get interview results and evaluation
   * @param {string} sessionId
   * @returns {Promise} { overallScore, skillScores, strengths, improvements, questionAnalysis }
   */
  getResult: (sessionId) => api.get(`/interview/result/${sessionId}`),
};

export default interviewService;

