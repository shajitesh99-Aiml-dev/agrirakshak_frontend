/**
 * Case AI Analysis Route Handler
 * POST /api/v1/cases/:caseId/analyze
 * 
 * Security Controls:
 * - Case ID validation against path traversal
 * - Authentication & Case Ownership verification
 * - Rate limiting (10 requests / min) to prevent API abuse
 * - Safe response sanitization
 */

import { caseStore } from '../store/caseStore.js';
import { groqService } from '../services/groqService.js';
import { authenticateRequest, checkCaseOwnership } from '../middleware/authMiddleware.js';
import { checkRateLimit, getClientIp } from '../middleware/securityMiddleware.js';
import { validateCaseId } from '../utils/inputValidator.js';

export async function handleAnalyzeCase(req, res, caseId) {
  try {
    // 1. Validate case ID format
    if (!validateCaseId(caseId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Invalid case ID format.' }));
      return;
    }

    // 2. Authenticate caller
    if (!authenticateRequest(req, res)) return;

    // 3. Rate limiting for AI analysis
    const ip = getClientIp(req);
    const rateKey = `ai_analyze_${req.user.id || ip}`;
    const rate = checkRateLimit(rateKey, 10, 60000);
    if (!rate.allowed) {
      res.writeHead(429, {
        'Content-Type': 'application/json',
        'Retry-After': '60',
      });
      res.end(
        JSON.stringify({
          success: false,
          message: 'AI analysis rate limit reached. Please wait 1 minute before analyzing another case.',
        })
      );
      return;
    }

    // 4. Retrieve case details from store
    const cropCase = await caseStore.getCase(caseId);

    if (!cropCase) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: `Crop case #${caseId} not found.` }));
      return;
    }

    // 5. Verify case ownership (farmer can only analyze their own case, officers/admins can analyze assigned cases)
    if (!checkCaseOwnership(req, res, cropCase)) return;

    // 6. Execute Groq analysis server-side with data minimization
    const aiResult = await groqService.analyzeCropCase(cropCase);

    // 7. Persist analysis back to case store
    await caseStore.saveAnalysis(caseId, aiResult);

    // 8. Return standardized JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        caseId,
        status: aiResult.status || 'completed',
        analysis: aiResult,
      })
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: error.message || 'Internal server error while processing AI analysis.',
      })
    );
  }
}
