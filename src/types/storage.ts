import { AppUser } from './api';

// LocalStorage data types
export interface StorageData {
  user?: AppUser;
  preferences?: UserPreferences;
  session?: SessionData;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface SessionData {
  loginTime: string;
  lastActivity: string;
  deviceInfo?: string;
}

// Storage keys enum for type safety
export enum StorageKeys {
  USER = 'user',
  PREFERENCES = 'preferences',
  SESSION = 'session',
}

// Form validation types
export interface AuthFormData {
  phoneNumber: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}