/**
 * Agri Rakshak Backend Server
 * Smart India Hackathon 2026 (SIH26131)
 * 
 * Production Security Hardening:
 * - Security HTTP headers (HSTS, nosniff, DENY, etc.)
 * - CORS origin allowlist (no wildcard with credentials)
 * - In-memory sliding-window rate limiting
 * - Safe payload size limiting (defense against memory exhaustion)
 * - HMAC-signed Bearer token authentication
 * - Strict Role-Based Access Control (Farmer / Officer / Administrator)
 * - Case ownership verification and data isolation
 * - Input validation & path-traversal sanitization
 * - Zero secret leakage in logs, health checks, or error responses
 */

import http from 'node:http';
import { handleAnalyzeCase } from './routes/analyzeRoute.js';
import { handleLogin, handleRegister, handleMe, handleLogout } from './routes/authRoute.js';
import { handleGetProfile, handleUpdateProfile } from './routes/profileRoute.js';
import { handleGetNotifications, handleMarkRead, handleMarkAllRead } from './routes/notificationRoute.js';
import { caseStore } from './store/caseStore.js';
import { initializeDatabaseWithRetry, isDbConnected, isDatabaseRequired } from './db/prisma.js';
import {
  applySecurityHeaders,
  handleCORS,
  parseSafeBody,
  checkRateLimit,
  getClientIp,
} from './middleware/securityMiddleware.js';
import {
  authenticateRequest,
  requireRole,
  checkCaseOwnership,
} from './middleware/authMiddleware.js';
import {
  validateCaseId,
  validateCreateCaseInput,
  validateOfficerReviewInput,
} from './utils/inputValidator.js';

const PORT = parseInt(process.env.PORT || '8000', 10);

function validateProductionEnvironment() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const missing = [];
    if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
    if (!process.env.AUTH_SECRET) missing.push('AUTH_SECRET');
    if (missing.length > 0) {
      console.error(`[Agri Rakshak Startup Error] Missing required production environment variables: ${missing.join(', ')}`);
      console.error('[Agri Rakshak Startup Error] Production server startup aborted.');
      process.exit(1);
    }
  }
}

const server = http.createServer(async (req, res) => {
  // 1. Apply baseline HTTP security headers
  applySecurityHeaders(res);

  // 2. Handle CORS (preflight OPTIONS and origin check)
  if (!handleCORS(req, res)) {
    return;
  }

  // 3. Global IP rate limiting (120 req / min)
  const ip = getClientIp(req);
  const globalRate = checkRateLimit(`global_${ip}`, 120, 60000);
  if (!globalRate.allowed) {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': '60',
    });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Rate limit exceeded. Too many requests from this IP address.',
      })
    );
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  try {
    // -------------------------------------------------------------------------
    // PUBLIC ROUTES
    // -------------------------------------------------------------------------

    // Health Check: GET /api/v1/health
    if (req.method === 'GET' && pathname === '/api/v1/health') {
      const dbConnected = isDbConnected();
      const dbRequired = isDatabaseRequired();
      const status = (!dbConnected && dbRequired) ? 503 : 200;

      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: status === 200 ? 'ok' : 'degraded',
          service: 'Agri Rakshak AI & Agricultural Backend',
          uptime: process.uptime(),
          database: dbConnected ? 'connected' : 'standalone_fallback',
          databaseDetails: {
            status: dbConnected ? 'connected' : (dbRequired ? 'disconnected' : 'fallback'),
            required: dbRequired,
            mode: dbConnected ? 'postgresql_prisma' : (dbRequired ? 'postgres_required' : 'standalone_in_memory'),
          },
          groqConfigured: Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== ''),
          timestamp: new Date().toISOString(),
        })
      );
      return;
    }

    // Auth Login: POST /api/v1/auth/login
    if (req.method === 'POST' && pathname === '/api/v1/auth/login') {
      const body = await parseSafeBody(req, 1024 * 1024); // 1MB max for auth
      await handleLogin(req, res, body);
      return;
    }

    // Auth Register: POST /api/v1/auth/register
    if (req.method === 'POST' && pathname === '/api/v1/auth/register') {
      const body = await parseSafeBody(req, 1024 * 1024);
      await handleRegister(req, res, body);
      return;
    }

    // -------------------------------------------------------------------------
    // AUTHENTICATED USER ROUTES (Any valid role)
    // -------------------------------------------------------------------------

    // Auth Current User: GET /api/v1/auth/me
    if (req.method === 'GET' && pathname === '/api/v1/auth/me') {
      await handleMe(req, res);
      return;
    }

    // Auth Logout: POST /api/v1/auth/logout
    if (req.method === 'POST' && pathname === '/api/v1/auth/logout') {
      await handleLogout(req, res);
      return;
    }

    // User Profile: GET & PATCH /api/v1/profile
    if (pathname === '/api/v1/profile') {
      if (req.method === 'GET') {
        await handleGetProfile(req, res);
        return;
      }
      if (req.method === 'PATCH') {
        const body = await parseSafeBody(req, 1024 * 1024);
        await handleUpdateProfile(req, res, body);
        return;
      }
    }

    // Notifications: GET /api/v1/notifications
    if (req.method === 'GET' && pathname === '/api/v1/notifications') {
      await handleGetNotifications(req, res);
      return;
    }

    // Notifications Mark Single Read: PATCH /api/v1/notifications/:id/read
    const notifReadMatch = pathname.match(/^\/api\/v1\/notifications\/([^/]+)\/read$/);
    if (req.method === 'PATCH' && notifReadMatch) {
      const notifId = decodeURIComponent(notifReadMatch[1]);
      await handleMarkRead(req, res, notifId);
      return;
    }

    // Notifications Mark All Read: PATCH /api/v1/notifications/read-all
    if (req.method === 'PATCH' && pathname === '/api/v1/notifications/read-all') {
      await handleMarkAllRead(req, res);
      return;
    }

    // -------------------------------------------------------------------------
    // FARMER & ROLE-SPECIFIC WORKSPACES
    // -------------------------------------------------------------------------

    // Farmer Dashboard Summary: GET /api/v1/dashboard/farmer
    if (req.method === 'GET' && pathname === '/api/v1/dashboard/farmer') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['farmer', 'admin'])) return;

      const farmerCases = await caseStore.getFilteredCases({
        farmerId: req.user.id,
      });

      const summary = {
        total: farmerCases.length,
        pending: farmerCases.filter((c) => c.status === 'pending').length,
        analyzing: farmerCases.filter((c) => c.status === 'analyzing').length,
        resolved: farmerCases.filter((c) => c.status === 'resolved').length,
        escalated: farmerCases.filter((c) => c.status === 'escalated').length,
      };

      const pendingActions = farmerCases
        .filter((c) => c.status === 'resolved' || c.status === 'analyzing')
        .slice(0, 2)
        .map((c) => ({
          id: `pa-${c.id}`,
          caseId: c.id,
          title: `Diagnostic Advisory Available: ${c.cropName}`,
          description: `Agricultural Officer verified treatment plan for Case #${c.id}.`,
          actionType: 'view_advisory',
          actionUrl: `/farmer/cases/${c.id}`,
          actionLabel: 'View Advisory',
          priority: c.severity === 'high' ? 'urgent' : 'normal',
          createdAt: c.updatedAt || c.reportedAt,
        }));

      const alerts = [
        {
          id: 'alert-001',
          title: 'Fall Armyworm Advisory: Maize Crops',
          summary: 'Krishi Vigyan Kendra issued an advisory for early whorl inspection on maize. Apply neem seed kernel extract (NSKE 5%) at first sight.',
          type: 'pest_outbreak',
          date: '2026-02-18',
          source: 'State Agricultural Extension Services',
        },
        {
          id: 'alert-002',
          title: 'IMD Agro-Meteorological Weather Bulletin',
          summary: 'Partly cloudy sky with light sporadic rainfall anticipated over the next 48-72 hours. Postpone foliar pesticide sprays until weather clears.',
          type: 'weather',
          date: '2026-02-17',
          source: 'India Meteorological Department',
        },
        {
          id: 'alert-003',
          title: 'PM-Kisan Samman Nidhi Verification Notice',
          summary: 'Farmers are advised to complete e-KYC via facial authentication on PM-Kisan mobile app before the upcoming seasonal release.',
          type: 'scheme',
          date: '2026-02-15',
          source: 'Ministry of Agriculture & Farmers Welfare',
        },
      ];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: true,
          data: {
            summary,
            recentCases: farmerCases.slice(0, 5),
            pendingActions,
            alerts,
          },
        })
      );
      return;
    }

    // Officer Dashboard Summary: GET /api/v1/dashboard/officer
    if (req.method === 'GET' && pathname === '/api/v1/dashboard/officer') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['officer', 'admin'])) return;

      const data = await caseStore.getOfficerDashboardSummary();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }

    // Admin Dashboard Summary: GET /api/v1/dashboard/admin
    if (req.method === 'GET' && pathname === '/api/v1/dashboard/admin') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['admin'])) return;

      const range = url.searchParams.get('range') || '30d';
      const data = await caseStore.getAdminDashboardSummary(range);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }

    // Hotspot Surveillance: GET /api/v1/analytics/hotspots
    if (req.method === 'GET' && pathname === '/api/v1/analytics/hotspots') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['officer', 'admin'])) return;

      const hotspots = await caseStore.getHotspots();
      const alerts = await caseStore.getOutbreakAlerts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: { hotspots, alerts } }));
      return;
    }

    // Analytics Detailed Overview: GET /api/v1/analytics/overview
    if (req.method === 'GET' && pathname === '/api/v1/analytics/overview') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['officer', 'admin'])) return;

      const range = url.searchParams.get('range') || '30d';
      const data = caseStore.getAnalyticsOverview(range);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }

    // User Directory Summary: GET /api/v1/admin/users
    if (req.method === 'GET' && pathname === '/api/v1/admin/users') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['admin'])) return;

      const data = caseStore.getAdminUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }

    // -------------------------------------------------------------------------
    // CROP CASE OPERATIONS
    // -------------------------------------------------------------------------

    // AI Analysis Route: POST /api/v1/cases/:caseId/analyze
    const analyzeMatch = pathname.match(/^\/api\/v1\/cases\/([^/]+)\/analyze$/);
    if (req.method === 'POST' && analyzeMatch) {
      const caseId = decodeURIComponent(analyzeMatch[1]);
      await handleAnalyzeCase(req, res, caseId);
      return;
    }

    // Officer Review Submission: POST /api/v1/cases/:caseId/review
    const reviewMatch = pathname.match(/^\/api\/v1\/cases\/([^/]+)\/review$/);
    if (req.method === 'POST' && reviewMatch) {
      const caseId = decodeURIComponent(reviewMatch[1]);

      if (!validateCaseId(caseId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid case ID format.' }));
        return;
      }

      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['officer', 'admin'])) return;

      const body = await parseSafeBody(req, 1024 * 1024);
      const validation = validateOfficerReviewInput(body);

      if (!validation.valid) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: validation.errors.join(' ') }));
        return;
      }

      const updated = await caseStore.saveOfficerReview(caseId, validation.sanitized);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Case not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, case: updated, message: 'Officer review recorded successfully.' }));
      return;
    }

    // Update Case Status: PATCH /api/v1/cases/:caseId/status
    const statusMatch = pathname.match(/^\/api\/v1\/cases\/([^/]+)\/status$/);
    if (req.method === 'PATCH' && statusMatch) {
      const caseId = decodeURIComponent(statusMatch[1]);

      if (!validateCaseId(caseId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid case ID format.' }));
        return;
      }

      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['officer', 'admin'])) return;

      const body = await parseSafeBody(req, 1024 * 1024);
      const validStatuses = ['pending', 'under_review', 'analyzing', 'resolved', 'escalated'];

      if (!body.status || !validStatuses.includes(body.status)) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: false,
            message: `Invalid status: '${body.status}'. Valid statuses: ${validStatuses.join(', ')}`,
          })
        );
        return;
      }

      const updated = await caseStore.updateStatus(caseId, body.status, body.note || body.reason);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Case not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, case: updated, message: `Status updated to ${body.status}.` }));
      return;
    }

    // Get Single Case: GET /api/v1/cases/:caseId
    const getCaseMatch = pathname.match(/^\/api\/v1\/cases\/([^/]+)$/);
    if (req.method === 'GET' && getCaseMatch) {
      const caseId = decodeURIComponent(getCaseMatch[1]);

      if (!validateCaseId(caseId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid case ID format.' }));
        return;
      }

      if (!authenticateRequest(req, res)) return;

      const cropCase = await caseStore.getCase(caseId);
      if (!cropCase) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Case not found' }));
        return;
      }

      // Verify case ownership for farmers
      if (!checkCaseOwnership(req, res, cropCase)) return;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, case: cropCase }));
      return;
    }

    // List Cases: GET /api/v1/cases
    if (req.method === 'GET' && pathname === '/api/v1/cases') {
      if (!authenticateRequest(req, res)) return;

      const filter = {
        status: url.searchParams.get('status') || 'all',
        severity: url.searchParams.get('severity') || 'all',
        crop: url.searchParams.get('crop') || 'all',
        search: url.searchParams.get('search') || '',
      };

      // Data Isolation: If caller is a farmer, only return their own cases
      if (req.user.role === 'farmer') {
        filter.farmerId = req.user.id;
      }

      const cases = await caseStore.getFilteredCases(filter);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, cases, count: cases.length }));
      return;
    }

    // Create Case: POST /api/v1/cases
    if (req.method === 'POST' && pathname === '/api/v1/cases') {
      if (!authenticateRequest(req, res)) return;
      if (!requireRole(req, res, ['farmer', 'admin'])) return;

      const body = await parseSafeBody(req, 10 * 1024 * 1024); // 10MB for image data
      const validation = validateCreateCaseInput(body);

      if (!validation.valid) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: validation.errors.join(' ') }));
        return;
      }

      const caseId = `CASE-2026-${Math.floor(100 + Math.random() * 900)}`;
      const sanitized = validation.sanitized;

      const created = {
        id: caseId,
        farmerId: req.user.id,
        farmerName: req.user.name,
        farmerPhone: req.user.phone || '+91 98765 43210',
        cropName: sanitized.cropName,
        status: 'pending',
        reportedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        growthStage: sanitized.cultivationStage || 'Vegetative Stage',
        village: sanitized.village || req.user.village || 'Rampur',
        district: sanitized.district || req.user.district || 'Varanasi',
        state: sanitized.state || req.user.state || 'Uttar Pradesh',
        description: sanitized.description || '',
        symptoms: sanitized.symptoms || [],
        imageUrls: sanitized.imageUrls || [],
        timeline: [
          {
            id: `tl-${caseId}-1`,
            caseId,
            type: 'case_created',
            title: 'Case Report Created',
            description: `Case filed by farmer ${req.user.name}.`,
            actor: `${req.user.name} (Farmer)`,
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await caseStore.saveCase(created);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, case: created }));
      return;
    }

    // Default 404 for unmatched routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: `Endpoint ${req.method} ${pathname} not found on Agri Rakshak backend.`,
      })
    );
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: err.message || 'Internal server error occurred.',
      })
    );
  }
});

async function startServer() {
  try {
    validateProductionEnvironment();
    await initializeDatabaseWithRetry();
  } catch (err) {
    console.error(`[Agri Rakshak Backend] Startup aborted: ${err.message}`);
    process.exit(1);
  }

  server.listen(PORT, () => {
    console.log(`[Agri Rakshak Backend] Server running at http://localhost:${PORT}/api/v1`);
    console.log(
      `[Agri Rakshak Backend] Database: ${
        isDbConnected()
          ? 'PostgreSQL Active via Prisma'
          : isDatabaseRequired()
          ? 'Database Required (Disconnected)'
          : 'Standalone Resilient Fallback Active'
      }`
    );
    console.log(
      `[Agri Rakshak Backend] Groq AI: ${
        process.env.GROQ_API_KEY ? 'Configured (Active)' : 'Not configured'
      }`
    );
    console.log(`[Agri Rakshak Backend] Security: Rate Limiting & RBAC Active`);
  });
}

startServer();
