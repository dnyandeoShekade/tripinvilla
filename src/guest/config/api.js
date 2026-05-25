export const API_BASE = import.meta.env.VITE_API_BASE || `${import.meta.env.VITE_API_BASE}`;

export const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return 'http://13.127.196.228:8000';
  }
})();

