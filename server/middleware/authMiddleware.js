/**
 * Authentication and Role-Based Authorization Middleware
 * Validates HMAC-signed Bearer tokens, extracts authenticated caller identity,
 * and enforces strict role and case ownership boundaries.
 */

import crypto from 'node:crypto';

const AUTH_SECRET = process.env.AUTH_SECRET || 'agri-rakshak-secure-signing-secret-2026';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a cryptographically signed authentication token
 */
export function generateToken(user) {
  const payload = {
    sub: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
    village: user.village,
    district: user.district,
    state: user.state,
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `agr_${payloadB64}.${signature}`;
}

/**
 * Verify and decode an authentication token
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;

  // Support local development mock tokens only in non-production
  if (process.env.NODE_ENV !== 'production' && token.startsWith('dev_token_')) {
    const parts = token.split('_');
    const role = parts[2]; // e.g. 'farmer', 'officer', 'admin'
    if (role === 'farmer') return { id: 'usr-farmer-001', role: 'farmer', name: 'Ramesh Patel', phone: '9876543210' };
    if (role === 'officer') return { id: 'usr-officer-001', role: 'officer', name: 'Dr. Priya Sharma', phone: '9876543211' };
    if (role === 'admin') return { id: 'usr-admin-001', role: 'admin', name: 'Super Administrator', phone: '9876543212' };
  }

  if (!token.startsWith('agr_')) return null;

  const raw = token.slice(4);
  const dotIndex = raw.indexOf('.');
  if (dotIndex === -1) return null;

  const payloadB64 = raw.slice(0, dotIndex);
  const signature = raw.slice(dotIndex + 1);

  const expectedSig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature.length !== expectedSig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return {
      id: payload.sub,
      role: payload.role,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      village: payload.village,
      district: payload.district,
      state: payload.state,
    };
  } catch {
    return null;
  }
}

/**
 * Authenticate request: extracts Bearer token, attaches req.user
 * Returns null if authentication succeeded, or sends 401 response and returns false.
 */
export function authenticateRequest(req, res, options = { required: true }) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (!options.required) {
      req.user = null;
      return true;
    }
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Authentication required. Missing or malformed Authorization header.',
      })
    );
    return false;
  }

  const token = authHeader.slice(7).trim();
  const user = verifyToken(token);

  if (!user) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Invalid or expired authentication token. Please sign in again.',
      })
    );
    return false;
  }

  req.user = user;
  return true;
}

/**
 * Enforce role permissions
 */
export function requireRole(req, res, allowedRoles = []) {
  if (!req.user) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Authentication required.' }));
    return false;
  }

  if (!allowedRoles.includes(req.user.role)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: `Access denied: '${req.user.role}' role is not authorized for this resource. Required: ${allowedRoles.join(
          ' or '
        )}.`,
      })
    );
    return false;
  }

  return true;
}

/**
 * Enforce case ownership:
 * - Farmers may only view or update their own cases
 * - Officers and Admins have authorized oversight across their jurisdictions
 */
export function checkCaseOwnership(req, res, cropCase) {
  if (!req.user) return false;

  // Officers and administrators have supervisory access
  if (req.user.role === 'officer' || req.user.role === 'admin') {
    return true;
  }

  // Farmer must own the case
  const isOwner =
    cropCase.farmerId === req.user.id ||
    (cropCase.farmerPhone && cropCase.farmerPhone === req.user.phone) ||
    (cropCase.farmerEmail && cropCase.farmerEmail === req.user.email);

  if (!isOwner) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Access denied: You do not have permission to view or modify this case record.',
      })
    );
    return false;
  }

  return true;
}
