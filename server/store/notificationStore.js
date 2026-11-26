/**
 * Agri Rakshak Notification Persistence Store
 * PostgreSQL-backed with Prisma ORM + resilient fallback
 * Problem Statement: SIH26131
 */

import { prisma, isDbConnected, isDatabaseRequired } from '../db/prisma.js';

const inMemoryNotifications = [
  {
    id: 'notif-001',
    type: 'officer_review',
    title: 'Officer Advisory Issued',
    message: 'Dr. Priya Sharma approved copper oxychloride spray treatment for Tomato Early Blight on Case #CASE-2026-104.',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    read: false,
    caseId: 'CASE-2026-104',
    severity: 'success',
    targetRole: 'farmer',
    targetUserId: 'usr-farmer-001',
  },
  {
    id: 'notif-002',
    type: 'admin_alert',
    title: 'Regional Outbreak Notice: Late Blight',
    message: 'District Krishi Vigyan Kendra issued an alert for high humidity fungal spore clusters in Nashik taluk.',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    severity: 'warning',
    targetRole: 'all',
  },
  {
    id: 'notif-003',
    type: 'ai_analysis',
    title: 'AI Pathology Detection Completed',
    message: 'Deep learning vision model diagnosed Rice Brown Spot with 94.2% confidence for Case #CASE-2026-104.',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    read: true,
    caseId: 'CASE-2026-104',
    severity: 'info',
    targetRole: 'farmer',
    targetUserId: 'usr-farmer-001',
  },
  {
    id: 'notif-004',
    type: 'field_visit',
    title: 'Field Inspection Scheduled',
    message: 'Extension Agronomist field visit has been scheduled for tomorrow at 10:30 AM in Rampur village.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: false,
    caseId: 'CASE-2026-104',
    severity: 'info',
    targetRole: 'farmer',
    targetUserId: 'usr-farmer-001',
  },
  {
    id: 'notif-005',
    type: 'escalation',
    title: 'High-Severity Triage Escalation',
    message: 'Case #CASE-2026-092 (Fall Armyworm on Maize) was escalated to District Directorate for containment.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    read: false,
    caseId: 'CASE-2026-092',
    severity: 'error',
    targetRole: 'officer',
  },
  {
    id: 'notif-006',
    type: 'system',
    title: 'Platform Maintenance Notice',
    message: 'Telemetry synchronization completed successfully. AI Vision Model v2.4 operational statewide.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    severity: 'info',
    targetRole: 'all',
  },
];

export const notificationStore = {
  async getForUser(user) {
    if (!user) return [];

    if (isDbConnected()) {
      try {
        const notifications = await prisma.notification.findMany({
          where: {
            OR: [
              { targetUserId: user.id },
              { targetRole: 'all' },
              { targetRole: user.role },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });

        // Ensure dates are ISO formatted
        return notifications.map((n) => ({
          ...n,
          createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : n.createdAt,
        }));
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[notificationStore] Database query failed: ${err.message}`);
        }
        console.warn(`[notificationStore] DB findMany error (${err.message}); using memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[notificationStore] Database required but PostgreSQL is not connected');
    }

    return inMemoryNotifications.filter((n) => {
      if (n.targetUserId && n.targetUserId !== user.id) return false;
      if (!n.targetRole || n.targetRole === 'all') return true;
      return n.targetRole === user.role;
    });
  },

  async markAsRead(id, user) {
    if (isDbConnected()) {
      try {
        const notif = await prisma.notification.findUnique({ where: { id } });
        if (!notif) return null;
        if (notif.targetUserId && notif.targetUserId !== user.id) return null;

        const updated = await prisma.notification.update({
          where: { id },
          data: { read: true },
        });

        return {
          ...updated,
          createdAt: updated.createdAt instanceof Date ? updated.createdAt.toISOString() : updated.createdAt,
        };
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[notificationStore] Database markAsRead failed: ${err.message}`);
        }
        console.warn(`[notificationStore] DB markAsRead error (${err.message}); using memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[notificationStore] Database required but PostgreSQL is not connected');
    }

    const item = inMemoryNotifications.find((n) => n.id === id);
    if (!item) return null;
    if (item.targetUserId && item.targetUserId !== user.id) return null;
    item.read = true;
    return item;
  },

  async markAllAsRead(user) {
    if (isDbConnected()) {
      try {
        const result = await prisma.notification.updateMany({
          where: {
            AND: [
              { read: false },
              {
                OR: [
                  { targetUserId: user.id },
                  { targetRole: 'all' },
                  { targetRole: user.role },
                ],
              },
            ],
          },
          data: { read: true },
        });
        return result.count;
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[notificationStore] Database markAllAsRead failed: ${err.message}`);
        }
        console.warn(`[notificationStore] DB markAllAsRead error (${err.message}); using memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[notificationStore] Database required but PostgreSQL is not connected');
    }

    let count = 0;
    for (const item of inMemoryNotifications) {
      if (
        (!item.targetRole || item.targetRole === 'all' || item.targetRole === user.role) &&
        (!item.targetUserId || item.targetUserId === user.id)
      ) {
        if (!item.read) {
          item.read = true;
          count++;
        }
      }
    }
    return count;
  },

  async createNotification(data) {
    if (isDbConnected()) {
      try {
        const notif = await prisma.notification.create({
          data: {
            id: data.id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            type: data.type || 'system',
            title: data.title,
            message: data.message,
            read: Boolean(data.read),
            caseId: data.caseId || null,
            severity: data.severity || 'info',
            targetRole: data.targetRole || 'all',
            targetUserId: data.targetUserId || null,
          },
        });
        return {
          ...notif,
          createdAt: notif.createdAt instanceof Date ? notif.createdAt.toISOString() : notif.createdAt,
        };
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[notificationStore] Database createNotification failed: ${err.message}`);
        }
        console.warn(`[notificationStore] DB createNotification error (${err.message}); fallback to memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[notificationStore] Database required but PostgreSQL is not connected');
    }

    const newNotif = {
      id: data.id || `notif-${Date.now()}`,
      type: data.type || 'system',
      title: data.title,
      message: data.message,
      read: Boolean(data.read),
      caseId: data.caseId || null,
      severity: data.severity || 'info',
      targetRole: data.targetRole || 'all',
      targetUserId: data.targetUserId || null,
      createdAt: new Date().toISOString(),
    };
    inMemoryNotifications.unshift(newNotif);
    return newNotif;
  },
};
