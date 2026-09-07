import { NextFunction, Request, Response } from 'express';
import { USER_ROLES, type UserRole } from '../constants/auth.constants.js';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants/auth.constants.js';
import { verifyAccessToken } from '../utils/jwt.js';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string; role: UserRole };
    }
  }
}

const COOKIE_NAME = ACCESS_TOKEN_COOKIE_NAME;

function readPayload(req: Request): { userId: string; email: string; role: UserRole } | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;

  try {
    const payload = verifyAccessToken(token);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = readPayload(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  req.user = user;
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = readPayload(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (user.role !== USER_ROLES.ADMIN) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  req.user = user;
  next();
}

export function requireCreator(req: Request, res: Response, next: NextFunction) {
  const user = readPayload(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (user.role !== USER_ROLES.CREATOR) {
    return res.status(403).json({ error: 'Creator access required' });
  }

  req.user = user;
  next();
}