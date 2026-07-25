import { useState, useEffect } from 'react';

/**
 * Generic hook for persisting state to localStorage.
 * Can be used for non-critical UI preferences (e.g., theme, sidebar state).
 * 
 * Note: Interview history, practice state, and interview state should
 * come from the backend API, not localStorage. The hooks below are
 * deprecated and kept only for reference until backend integration.
 */

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

/**
 * @deprecated Interview history should be fetched from backend API.
 * This hook simulates persistence and will be removed once backend is connected.
 */
export const useInterviewHistory = () => {
  console.warn('useInterviewHistory is deprecated - use the backend API instead');
  return useLocalStorage('selfsync_history', []);
};

/**
 * @deprecated Interview state should be managed by backend API.
 * This hook simulates persistence and will be removed once backend is connected.
 */
export const useInterviewState = () => {
  console.warn('useInterviewState is deprecated - use the backend API instead');
  return useLocalStorage('selfsync_interview_state', null);
};

/**
 * @deprecated Practice state should be managed by backend API.
 * This hook simulates persistence and will be removed once backend is connected.
 */
export const usePracticeState = () => {
  console.warn('usePracticeState is deprecated - use the backend API instead');
  return useLocalStorage('selfsync_practice_state', null);
};

