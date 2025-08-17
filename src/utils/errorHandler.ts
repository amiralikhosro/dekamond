import { config } from '@/config';

// Error types
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly status?: number;
  public readonly code?: string;
  public readonly retryable: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    status?: number,
    code?: string,
    retryable: boolean = false
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.status = status;
    this.code = code;
    this.retryable = retryable;
  }
}

// Error classification
export const classifyError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new AppError(
      'Network connection failed. Please check your internet connection.',
      ErrorType.NETWORK,
      undefined,
      'NETWORK_ERROR',
      true
    );
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      ErrorType.UNKNOWN,
      undefined,
      'UNKNOWN_ERROR',
      false
    );
  }

  return new AppError(
    'An unexpected error occurred',
    ErrorType.UNKNOWN,
    undefined,
    'UNKNOWN_ERROR',
    false
  );
};

// Retry logic with exponential backoff
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = config.api.retryAttempts,
  baseDelay: number = config.api.retryDelay
): Promise<T> => {
  let lastError: AppError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = classifyError(error);

      // Don't retry if error is not retryable or it's the last attempt
      if (!lastError.retryable || attempt === maxAttempts) {
        throw lastError;
      }

      // Exponential backoff: delay increases with each attempt
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

// HTTP status code error classification
export const createHttpError = (status: number, message: string): AppError => {
  if (status >= 400 && status < 500) {
    if (status === 401 || status === 403) {
      return new AppError(
        message,
        ErrorType.AUTHENTICATION,
        status,
        `HTTP_${status}`,
        false
      );
    }
    return new AppError(
      message,
      ErrorType.VALIDATION,
      status,
      `HTTP_${status}`,
      false
    );
  }

  if (status >= 500) {
    return new AppError(
      message,
      ErrorType.SERVER,
      status,
      `HTTP_${status}`,
      true
    );
  }

  return new AppError(
    message,
    ErrorType.UNKNOWN,
    status,
    `HTTP_${status}`,
    false
  );
};

// Global error handler
export const handleError = (error: unknown, context?: string): void => {
  const appError = classifyError(error);

  // Log error for debugging
  console.error(`[${context || 'Unknown'}] Error:`, {
    message: appError.message,
    type: appError.type,
    status: appError.status,
    code: appError.code,
    stack: appError.stack,
  });

  // Here you could add error reporting service integration
  // e.g., Sentry, LogRocket, etc.
};

// User-friendly error messages
export const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.NETWORK:
      return 'Please check your internet connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Please log in again to continue.';
    case ErrorType.VALIDATION:
      return error.message; // Validation errors are usually user-friendly
    case ErrorType.SERVER:
      return 'Our servers are experiencing issues. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
};