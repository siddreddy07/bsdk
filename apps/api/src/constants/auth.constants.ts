const DAYS_TO_MS = 24 * 60 * 60 * 1000;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  CREATOR: 'creator',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const ACCESS_TOKEN_EXPIRES_IN = '15m';
export const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;

export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none' as const,
  maxAge: ACCESS_TOKEN_MAX_AGE_MS,
};

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
export const REFRESH_TOKEN_EXPIRES_IN = '30d';
export const REFRESH_TOKEN_MAX_AGE_MS = 30 * DAYS_TO_MS;

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none' as const,
  maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  path: '/api/auth',
};