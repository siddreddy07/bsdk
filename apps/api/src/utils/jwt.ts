import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, type UserRole } from '../constants/auth.constants.js';

function requireSecret(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing`);
  }
  return value;
}

const ACCESS_SECRET = requireSecret('JWT_ACCESS_SECRET');
const REFRESH_SECRET = requireSecret('JWT_REFRESH_SECRET');

export function createAccessToken(payload: { userId: string; email: string; role: UserRole }) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;
}

export function createRefreshToken(payload: { userId: string }) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload;
}