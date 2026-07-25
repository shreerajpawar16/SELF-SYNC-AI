import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('selfsync_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('selfsync_token');
      localStorage.removeItem('selfsync_user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 409) {
      toast.error(message);
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Server is not running. Please start the backend.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
};

// Practice APIs
export const practiceAPI = {
  start: (technologies) => api.post('/practice/start', { technologies }),
  getQuestion: () => api.get('/practice/question'),
  submitAnswer: (questionId, answer) => api.post('/practice/answer', { questionId, answer }),
};

// Interview APIs
export const interviewAPI = {
  start: (setup) => api.post('/interview/start', setup),
  getQuestion: () => api.get('/interview/question'),
  submitAnswer: (questionId, answer) => api.post('/interview/answer', { questionId, answer }),
  end: () => api.post('/interview/end'),
  getResult: (sessionId) => api.get(`/interview/result/${sessionId}`),
};

// History API
export const historyAPI = {
  getAll: () => api.get('/history'),
};

// Profile APIs
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

export default api;

