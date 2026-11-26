/**
 * Agri Rakshak Server-Side Groq AI Service
 * Strictly executes ONLY on the backend server.
 * Reads GROQ_API_KEY from server environment.
 * 
 * Security Controls:
 * - 20-second timeout via AbortController
 * - Zero secret leakage in logs or error messages
 * - Structured payload validation
 */

import { buildGroqPrompt } from '../utils/promptBuilder.js';
import { validateAndNormalizeAIResponse } from '../utils/responseValidator.js';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'qwen/qwen3.8-27b';
const REQUEST_TIMEOUT_MS = 20000;

export const groqService = {
  /**
   * Request agricultural diagnosis from Groq API
   */
  async analyzeCropCase(caseData) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      const err = new Error(
        'GROQ_API_KEY is not configured on the Agri Rakshak backend server. Please set GROQ_API_KEY in the server environment.'
      );
      err.statusCode = 503;
      throw err;
    }

    const { systemPrompt, userContent } = buildGroqPrompt(caseData);

    const payload = {
      model: process.env.GROQ_MODEL || DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 1500,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status === 429) {
          const rateLimitErr = new Error('Groq AI service rate limit reached. Please retry in a few moments.');
          rateLimitErr.statusCode = 429;
          throw rateLimitErr;
        }

        const serverErr = new Error(`Groq AI service returned HTTP ${response.status}. Please try again later.`);
        serverErr.statusCode = response.status >= 500 ? 502 : 500;
        throw serverErr;
      }

      const data = await response.json();
      const messageContent = data.choices?.[0]?.message?.content;

      if (!messageContent) {
        const emptyErr = new Error('Empty response received from Groq model.');
        emptyErr.statusCode = 502;
        throw emptyErr;
      }

      return validateAndNormalizeAIResponse(messageContent);
    } catch (err) {
      clearTimeout(timeout);

      if (err.name === 'AbortError') {
        const timeoutErr = new Error('Groq AI request timed out after 20 seconds. Please retry.');
        timeoutErr.statusCode = 504;
        throw timeoutErr;
      }

      // Ensure error message never contains apiKey
      if (err.message && apiKey && err.message.includes(apiKey.trim())) {
        err.message = err.message.replace(apiKey.trim(), '[REDACTED_API_KEY]');
      }

      throw err;
    }
  },
};
