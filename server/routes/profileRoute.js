/**
 * User Profile Route Handlers
 * Serves:
 * - GET /api/v1/profile
 * - PATCH /api/v1/profile
 */

import { userStore } from '../store/userStore.js';
import { authenticateRequest } from '../middleware/authMiddleware.js';
import { sanitizeText } from '../utils/inputValidator.js';

export async function handleGetProfile(req, res) {
  if (!authenticateRequest(req, res)) return;

  const profile = await userStore.findById(req.user.id);
  if (!profile) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Profile not found.' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, user: profile }));
}

export async function handleUpdateProfile(req, res, body) {
  if (!authenticateRequest(req, res)) return;

  const updates = {};

  if (body.name !== undefined) {
    const cleanName = sanitizeText(body.name);
    if (cleanName.length < 2) {
      res.writeHead(422, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Name must be at least 2 characters.' }));
      return;
    }
    updates.name = cleanName;
  }

  if (body.phone !== undefined) {
    const cleanPhone = body.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      res.writeHead(422, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Please provide a valid 10-digit mobile number.' }));
      return;
    }
    updates.phone = cleanPhone;
  }

  if (body.village !== undefined) updates.village = sanitizeText(body.village);
  if (body.district !== undefined) updates.district = sanitizeText(body.district);
  if (body.state !== undefined) updates.state = sanitizeText(body.state);
  if (body.farmSizeAcres !== undefined) {
    const acres = parseFloat(body.farmSizeAcres);
    if (!isNaN(acres) && acres >= 0 && acres <= 1000) {
      updates.farmSizeAcres = acres;
    }
  }

  const lang = body.preferredLanguage || body.preferred_language;
  if (lang && ['en', 'te', 'hi', 'kn'].includes(lang)) {
    updates.preferredLanguage = lang;
  }

  const updated = await userStore.updateProfile(req.user.id, updates);

  if (!updated) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Profile not found.' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, user: updated, message: 'Profile updated successfully.' }));
}
