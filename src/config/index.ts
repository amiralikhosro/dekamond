import {
  COOKIE_EXPIRATION_DAYS,
  PHONE_NUMBER_PATTERN,
  API_RETRY_ATTEMPTS,
  API_RETRY_DELAY,
  API_ENDPOINTS
} from '@/constants';

// Environment configuration
export const config = {
  api: {
    baseUrl: API_ENDPOINTS.RANDOM_USER,
    retryAttempts: API_RETRY_ATTEMPTS,
    retryDelay: API_RETRY_DELAY,
  },
  auth: {
    cookieExpirationDays: COOKIE_EXPIRATION_DAYS,
    phoneNumberPattern: PHONE_NUMBER_PATTERN,
  },
} as const;

// Cookie settings
export const cookieSettings = {
  maxAge: config.auth.cookieExpirationDays * 24 * 60 * 60, // Convert days to seconds
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

// API endpoints
export const endpoints = {
  randomUser: `${config.api.baseUrl}?results=1&nat=us`,
} as const;