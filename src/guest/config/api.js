export const API_BASE = 'http://13.127.196.228:8000/api';

export const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return 'http://13.127.196.228:8000';
  }
})();

