/**
 * Notification Route Handlers
 * Serves:
 * - GET /api/v1/notifications
 * - PATCH /api/v1/notifications/:id/read
 * - PATCH /api/v1/notifications/read-all
 */

import { notificationStore } from '../store/notificationStore.js';
import { authenticateRequest } from '../middleware/authMiddleware.js';

export async function handleGetNotifications(req, res) {
  if (!authenticateRequest(req, res)) return;

  const list = await notificationStore.getForUser(req.user);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, notifications: list, count: list.length }));
}

export async function handleMarkRead(req, res, notifId) {
  if (!authenticateRequest(req, res)) return;

  const updated = await notificationStore.markAsRead(notifId, req.user);
  if (!updated) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Notification not found.' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, notification: updated }));
}

export async function handleMarkAllRead(req, res) {
  if (!authenticateRequest(req, res)) return;

  const count = await notificationStore.markAllAsRead(req.user);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, count, message: 'All notifications marked as read.' }));
}
