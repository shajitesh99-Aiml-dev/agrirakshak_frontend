/**
 * Authentication Route Handlers
 * Serves:
 * - POST /api/v1/auth/login
 * - POST /api/v1/auth/register
 * - GET /api/v1/auth/me
 * - POST /api/v1/auth/logout
 */

import { userStore } from '../store/userStore.js';
import { generateToken, authenticateRequest } from '../middleware/authMiddleware.js';
import { checkRateLimit, getClientIp } from '../middleware/securityMiddleware.js';

export async function handleLogin(req, res, body) {
  const ip = getClientIp(req);
  const rate = checkRateLimit(`login_${ip}`, 10, 60000);
  if (!rate.allowed) {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': '60',
    });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Too many login attempts. Please wait 1 minute before trying again.',
      })
    );
    return;
  }

  const { emailOrPhone, password } = body;

  if (!emailOrPhone || !password) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Email/Phone and password are required.',
      })
    );
    return;
  }

  const user = await userStore.authenticate(emailOrPhone, password);

  if (!user) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Invalid email/phone or password.',
      })
    );
    return;
  }

  const token = generateToken(user);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      success: true,
      token,
      user,
      message: 'Sign in successful.',
    })
  );
}

export async function handleRegister(req, res, body) {
  const ip = getClientIp(req);
  const rate = checkRateLimit(`register_${ip}`, 10, 60000);
  if (!rate.allowed) {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': '60',
    });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Too many registration requests. Please wait a moment.',
      })
    );
    return;
  }

  const { name, emailOrPhone, password, village, district, state } = body;

  if (!name || name.trim().length < 2) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Valid name is required (minimum 2 characters).' }));
    return;
  }

  if (!emailOrPhone) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Valid email or 10-digit mobile number is required.' }));
    return;
  }

  if (!password || password.length < 6) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Password must be at least 6 characters.' }));
    return;
  }

  const isEmail = emailOrPhone.includes('@');
  const email = isEmail ? emailOrPhone.trim().toLowerCase() : undefined;
  const phone = !isEmail ? emailOrPhone.replace(/\D/g, '') : undefined;

  try {
    const user = await userStore.createUser({
      name: name.trim(),
      email,
      phone: phone || (email ? '9876543299' : undefined),
      password,
      role: 'farmer',
      village: village?.trim(),
      district: district?.trim(),
      state: state?.trim(),
    });

    const token = generateToken(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        token,
        user,
        message: 'Farmer registration completed successfully.',
      })
    );
  } catch (err) {
    res.writeHead(409, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: err.message }));
  }
}

export async function handleMe(req, res) {
  if (!authenticateRequest(req, res)) return;

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, user: req.user }));
}

export async function handleLogout(req, res) {
  // In stateless token setup, client discards token
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, message: 'Signed out successfully.' }));
}
