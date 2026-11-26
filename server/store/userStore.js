/**
 * Agri Rakshak User Persistence Store
 * PostgreSQL-backed with Prisma ORM + resilient fallback
 * Problem Statement: SIH26131
 */

import crypto from 'node:crypto';
import { prisma, isDbConnected, isDatabaseRequired } from '../db/prisma.js';

// PBKDF2 password hasher
export function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password, storedHash, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

const SEED_SALT = 'agri-rakshak-sih-2026-salt';

// In-memory fallback map for local testing when PostgreSQL is not yet spun up
const inMemoryUsers = new Map();

const fallbackSeedUsers = [
  {
    id: 'usr-farmer-001',
    name: 'Ramesh Patel',
    email: 'kisan@agrirakshak.in',
    phone: '9876543210',
    role: 'farmer',
    village: 'Navsari',
    district: 'Navsari',
    state: 'Gujarat',
    farmSizeAcres: 3.5,
    preferredLanguage: 'en',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
    createdAt: '2026-01-15T08:30:00.000Z',
    updatedAt: '2026-01-15T08:30:00.000Z',
  },
  {
    id: 'usr-farmer-002',
    name: 'Sunil Verma',
    email: 'sunil@agrirakshak.in',
    phone: '9876543215',
    role: 'farmer',
    village: 'Kalyanpur',
    district: 'Kanpur Nagar',
    state: 'Uttar Pradesh',
    farmSizeAcres: 5.0,
    preferredLanguage: 'hi',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
    createdAt: '2026-01-18T10:00:00.000Z',
    updatedAt: '2026-01-18T10:00:00.000Z',
  },
  {
    id: 'usr-officer-001',
    name: 'Dr. Priya Sharma',
    email: 'officer@agrirakshak.in',
    phone: '9876543211',
    role: 'officer',
    district: 'Nashik',
    state: 'Maharashtra',
    assignedJurisdiction: 'Western Agronomy Subdivision (Taluk 1-4)',
    badgeNumber: 'KVK-AGR-MH-2026-084',
    preferredLanguage: 'en',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
    createdAt: '2026-01-10T09:00:00.000Z',
    updatedAt: '2026-01-10T09:00:00.000Z',
  },
  {
    id: 'usr-admin-001',
    name: 'Super Administrator',
    email: 'admin@agrirakshak.in',
    phone: '9876543212',
    role: 'admin',
    preferredLanguage: 'en',
    administrativeRegion: 'National Headquarters • State Surveillance Grid',
    permissions: [
      'all_districts_view',
      'model_monitoring',
      'outbreak_quarantine_broadcast',
      'user_management',
    ],
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

for (const user of fallbackSeedUsers) {
  inMemoryUsers.set(user.id, user);
}

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash: _p, salt: _s, ...sanitized } = user;
  return sanitized;
}

export const userStore = {
  async findById(id) {
    if (isDbConnected()) {
      try {
        const user = await prisma.user.findUnique({ where: { id } });
        return sanitizeUser(user);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`Database query failed while fetching user #${id}: ${err.message ? err.message.split('\n')[0] : 'Error'}`);
        }
        console.warn(`[userStore] DB findById error (${err.message}); falling back to memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('Database operation failed: PostgreSQL is required (DATABASE_REQUIRED=true) but is currently disconnected.');
    }

    const user = inMemoryUsers.get(id);
    return sanitizeUser(user);
  },

  async findByEmailOrPhone(identifier) {
    const clean = identifier.trim().toLowerCase();

    if (isDbConnected()) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: { equals: clean, mode: 'insensitive' } },
              { phone: clean },
            ],
          },
        });
        return user;
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`Database query failed while searching user: ${err.message ? err.message.split('\n')[0] : 'Error'}`);
        }
        console.warn(`[userStore] DB findByEmailOrPhone error (${err.message}); falling back to memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('Database operation failed: PostgreSQL is required (DATABASE_REQUIRED=true) but is currently disconnected.');
    }

    for (const user of inMemoryUsers.values()) {
      if (user.email?.toLowerCase() === clean || user.phone === clean) {
        return user;
      }
    }
    return null;
  },

  async authenticate(identifier, password) {
    const user = await this.findByEmailOrPhone(identifier);
    if (!user) return null;

    if (verifyPassword(password, user.passwordHash, user.salt)) {
      return sanitizeUser(user);
    }
    return null;
  },

  async createUser({ name, email, phone, password, role = 'farmer', village, district, state, preferredLanguage }) {
    const existing = await this.findByEmailOrPhone(email || phone);
    if (existing) {
      throw new Error('A user with this email or phone number already exists.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    const id = `usr-${role}-${Date.now()}`;

    const newUser = {
      id,
      name,
      email: email || null,
      phone,
      role,
      village: village || null,
      district: district || null,
      state: state || null,
      preferredLanguage: preferredLanguage || 'en',
      salt,
      passwordHash,
    };

    if (isDbConnected()) {
      try {
        const created = await prisma.user.create({
          data: {
            ...newUser,
            farmSizeAcres: 0,
            permissions: [],
          },
        });
        return sanitizeUser(created);
      } catch (err) {
        if (err.code === 'P2002') {
          throw new Error('A user with this email or phone number already exists.');
        }
        if (isDatabaseRequired()) {
          throw new Error(`Database write failed during user creation: ${err.message ? err.message.split('\n')[0] : 'Error'}`);
        }
        console.warn(`[userStore] DB createUser error (${err.message}); using memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('Database operation failed: PostgreSQL is required (DATABASE_REQUIRED=true) but is currently disconnected.');
    }

    const memoryUser = {
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryUsers.set(id, memoryUser);
    return sanitizeUser(memoryUser);
  },

  async updateProfile(id, updates) {
    // Disallow modifying sensitive security fields
    delete updates.id;
    delete updates.role;
    delete updates.passwordHash;
    delete updates.salt;

    if (isDbConnected()) {
      try {
        const updated = await prisma.user.update({
          where: { id },
          data: updates,
        });
        return sanitizeUser(updated);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`Database update failed for user profile: ${err.message ? err.message.split('\n')[0] : 'Error'}`);
        }
        console.warn(`[userStore] DB updateProfile error (${err.message}); falling back to memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('Database operation failed: PostgreSQL is required (DATABASE_REQUIRED=true) but is currently disconnected.');
    }

    const user = inMemoryUsers.get(id);
    if (!user) return null;

    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    inMemoryUsers.set(id, updated);
    return sanitizeUser(updated);
  },
};
