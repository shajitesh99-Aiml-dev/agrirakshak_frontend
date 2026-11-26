/**
 * Agri Rakshak PostgreSQL Prisma Client & Connection Resilience Manager
 * Problem Statement: SIH26131
 * 
 * Provides:
 * - Singleton PrismaClient instance
 * - Bounded connection retry logic
 * - DATABASE_REQUIRED strict mode enforcement
 * - Graceful connection teardown on SIGINT/SIGTERM
 */

import { PrismaClient } from '@prisma/client';

let prismaInstance = null;
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

export function isDatabaseRequired() {
  return process.env.DATABASE_REQUIRED === 'true' || process.env.NODE_ENV === 'production';
}

function getPrisma() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }
  return prismaInstance;
}

export const prisma = getPrisma();

/**
 * Checks connection to PostgreSQL by running a lightweight query.
 * Never prints connection strings or passwords in logs or error messages.
 */
export async function checkDbConnection() {
  if (!process.env.DATABASE_URL) {
    isConnected = false;
    return {
      connected: false,
      reason: 'DATABASE_URL environment variable is not defined',
    };
  }

  try {
    // Perform light query to verify database accessibility
    await prisma.$queryRaw`SELECT 1 as health_check`;
    isConnected = true;
    return { connected: true };
  } catch (err) {
    isConnected = false;
    return {
      connected: false,
      reason: err.message ? err.message.split('\n')[0] : 'Unknown database connection error',
    };
  }
}

/**
 * Initializes database connection with bounded retries.
 * If DATABASE_REQUIRED is true and connection fails, throws an error to abort startup.
 */
export async function initializeDatabaseWithRetry() {
  const dbRequired = isDatabaseRequired();

  if (!process.env.DATABASE_URL) {
    if (dbRequired) {
      const msg = '[Agri Rakshak DB Critical] DATABASE_REQUIRED is active, but DATABASE_URL is not configured. Server startup aborted.';
      console.error(msg);
      throw new Error(msg);
    }
    console.log('[Agri Rakshak DB] DATABASE_URL not set; running in explicit standalone development fallback mode.');
    isConnected = false;
    return false;
  }

  connectionAttempts = 0;
  while (connectionAttempts < MAX_RETRIES) {
    connectionAttempts++;
    console.log(`[Agri Rakshak DB] Connecting to PostgreSQL (Attempt ${connectionAttempts}/${MAX_RETRIES})...`);
    const status = await checkDbConnection();
    if (status.connected) {
      console.log('[Agri Rakshak DB] Successfully connected to PostgreSQL database via Prisma ORM.');
      isConnected = true;
      return true;
    }

    if (connectionAttempts < MAX_RETRIES) {
      console.warn(`[Agri Rakshak DB] Connection failed: ${status.reason}. Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    } else {
      console.error(`[Agri Rakshak DB] Could not establish connection to PostgreSQL after ${MAX_RETRIES} attempts.`);
      console.error(`[Agri Rakshak DB] Error summary: ${status.reason}`);
      isConnected = false;

      if (dbRequired) {
        const msg = `[Agri Rakshak DB Critical] Database connection is required (DATABASE_REQUIRED=true or NODE_ENV=production), but could not reach PostgreSQL. Startup aborted.`;
        console.error(msg);
        throw new Error(msg);
      } else {
        console.warn('[Agri Rakshak DB] Continuing in explicit development fallback mode because DATABASE_REQUIRED is not set.');
      }
    }
  }

  return false;
}

export function isDbConnected() {
  return isConnected;
}

export async function disconnectDb() {
  if (prismaInstance) {
    try {
      await prismaInstance.$disconnect();
    } catch {
      // Ignore disconnect errors during process shutdown
    }
    isConnected = false;
  }
}

export const disconnectDatabase = disconnectDb;

// Clean process shutdown handlers
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    await disconnectDb();
    process.exit(0);
  });
  process.on('SIGTERM', async () => {
    await disconnectDb();
    process.exit(0);
  });
}
