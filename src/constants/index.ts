// Application constants
export const COOKIE_EXPIRATION_DAYS = 7;
export const PHONE_NUMBER_PATTERN = '^09\\d{9}$';
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000;

// Additional constants for better organization
export const STORAGE_KEYS = {
  USER: 'user',
  PREFERENCES: 'preferences',
  SESSION: 'session'
} as const;

export const COOKIE_NAMES = {
  USER: STORAGE_KEYS.USER,
  SESSION: STORAGE_KEYS.SESSION
} as const;

export const API_ENDPOINTS = {
  RANDOM_USER: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://randomuser.me/api/'
} as const;