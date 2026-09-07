import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { USER_ROLES, type UserRole } from '../constants/auth.constants.js';
import { db } from '../config/db.js';
import { deleteFilesByUserAndBot } from './file.service.js';
import { getBotsByUser } from './bot.service.js';

const users = db.collection('users');

export async function registerUser(name: string, email: string, password: string, avatarUrl: string) {
  const existing = await users.findOne({ $or: [{ email }] });
  if (existing) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    avatarUrl,
    role: USER_ROLES.USER,
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return { _id: result.insertedId, name, email, avatarUrl, role: USER_ROLES.USER as UserRole };
}

export async function loginUser(email: string, password: string) {
  const user = await users.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  return { _id: user._id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, role: user.role as UserRole };
}

export async function findUserById(id: string) {
  const user = await users.findOne({ _id: new ObjectId(id) });
  if (!user) {
    return null;
  }

  return { _id: user._id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, role: user.role as UserRole };
}

export async function storeRefreshToken(userId: string, refreshToken: string) {
  await users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { refreshToken, updatedAt: new Date() } }
  );
}

export async function findUserByRefreshToken(refreshToken: string) {
  const user = await users.findOne({ refreshToken });
  if (!user) {
    return null;
  }

  return { _id: user._id, email: user.email, username: user.username, role: user.role as UserRole };
}

export async function removeRefreshToken(userId: string) {
  await users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { refreshToken: null, updatedAt: new Date() } }
  );
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; email?: string; avatarUrl?: string }
) {
  await users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...data, updatedAt: new Date() } }
  );

  return findUserById(userId);
}

export async function deleteUserAccount(userId: string) {
  const bots = await getBotsByUser(userId);

  await Promise.all(
    bots.map((bot) => deleteFilesByUserAndBot(userId, bot._id.toString()))
  );

  await db.collection("bots").deleteMany({ userId: new ObjectId(userId) });
  await db.collection("files").deleteMany({ userId: new ObjectId(userId) });
  await db
    .collection("knowledgeConfigs")
    .deleteMany({ userId: new ObjectId(userId) });
  await users.deleteOne({ _id: new ObjectId(userId) });
}