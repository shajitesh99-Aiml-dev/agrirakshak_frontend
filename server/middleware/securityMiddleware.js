/**
 * Security Middleware for Agri Rakshak Backend
 * Implements:
 * - Security HTTP Headers
 * - Strict CORS Allowlist (no wildcard credentials)
 * - In-Memory Sliding-Window Rate Limiting
 * - Payload Size Limits (defense against heap exhaustion)
 * - Safe JSON Body Parsing with Length Checks
 */

// Configuration
const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : [];

const ALLOWED_ORIGINS = [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins])];

// Maximum allowed payload size: 10 MB (supports image uploads)
const MAX_PAYLOAD_BYTES = 10 * 1024 * 1024;

/**
 * In-memory rate limiter per IP/identifier
 */
const rateLimitMap = new Map();

// Periodic cleanup of expired rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000);

export function checkRateLimit(key, limit = 60, windowMs = 60000) {
  const now = Date.now();
  let record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(key, record);
    return { allowed: true, remaining: limit - 1, resetTime: record.resetTime };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

export function applySecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(), geolocation=(self)');
}

export function handleCORS(req, res) {
  const origin = req.headers.origin;

  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      // Unapproved origin - do not set Allow-Origin header
      // If preflight OPTIONS, reject safely
      if (req.method === 'OPTIONS') {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'CORS origin not allowed.' }));
        return false;
      }
    }
  } else {
    // Non-browser or direct curl/test requests: allow standard local development
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return false;
  }

  return true;
}

export function parseSafeBody(req, maxBytes = MAX_PAYLOAD_BYTES) {
  return new Promise((resolve, reject) => {
    // Check Content-Length header first
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > maxBytes) {
      const err = new Error(`Payload too large. Maximum allowed size is ${Math.round(maxBytes / 1024 / 1024)}MB.`);
      err.statusCode = 413;
      return reject(err);
    }

    let body = '';
    let bytesReceived = 0;

    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
      if (bytesReceived > maxBytes) {
        req.destroy();
        const err = new Error(`Payload too large. Exceeded limit of ${Math.round(maxBytes / 1024 / 1024)}MB.`);
        err.statusCode = 413;
        return reject(err);
      }
      body += chunk;
    });

    req.on('end', () => {
      if (!body.trim()) {
        return resolve({});
      }
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch {
        const err = new Error('Invalid JSON payload provided.');
        err.statusCode = 400;
        reject(err);
      }
    });

    req.on('error', (err) => reject(err));
  });
}

export function getClientIp(req) {
  if (process.env.NODE_ENV !== 'production' && req.headers['x-forwarded-for-test']) {
    return req.headers['x-forwarded-for-test'];
  }
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}
