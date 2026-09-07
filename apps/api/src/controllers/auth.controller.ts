import { Request, Response } from 'express';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from '../constants/auth.constants.js';
import {
  findUserById,
  findUserByRefreshToken,
  loginUser,
  registerUser,
  removeRefreshToken,
  storeRefreshToken,
  deleteUserAccount,
  updateUserProfile,
} from '../services/auth.service.js';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.js';

export async function register(req: Request, res: Response) {
  const { name, email, password,avatarUrl } = req.body;

  try {

    const data = createUserSchema.safeParse(req.body)

    if (!data.success) {
      return res.status(400).json({
        error: data.error.issues[0]?.message,
      })
    }

    const user = await registerUser(name, email, password, avatarUrl);
    const accessToken = createAccessToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = createRefreshToken({ userId: user._id.toString() });

    await storeRefreshToken(user._id.toString(), refreshToken);

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    res.status(201).json({ user });

  } catch (error: any) {
    console.error('Error in register controller:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    const accessToken = createAccessToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = createRefreshToken({ userId: user._id.toString() });

    await storeRefreshToken(user._id.toString(), refreshToken);

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: 'Refresh token not found' });
  }

  try {
    const payload = verifyRefreshToken(token);
    const user = await findUserByRefreshToken(token);

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const newAccessToken = createAccessToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const newRefreshToken = createRefreshToken({ userId: user._id.toString() });

    await storeRefreshToken(user._id.toString(), newRefreshToken);

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, newAccessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    res.json({ user });
  } catch (error: any) {
    res.status(400).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await removeRefreshToken(payload.userId as string);
    } catch {
      // Token might be invalid, still clear cookies
    }
  }

  res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/api/auth' });
  res.json({ message: 'Logged out' });
}

export async function me(req: Request, res: Response) {
  const user = await findUserById(req.user!.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
}

export async function updateProfile(req: Request, res: Response) {
  const data = updateUserSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: data.error.issues[0]?.message });
  }

  try {
    const user = await updateUserProfile(req.user!.userId, data.data);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  const userId = req.user!.userId;

  try {
    await deleteUserAccount(userId);

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/api/auth' });
    res.json({ message: 'Account deleted' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
}