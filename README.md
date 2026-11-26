# Agri Rakshak (कृषि रक्षक)

## Purpose
**Agri Rakshak** is an AI-assisted crop disease and pest detection and agricultural case management platform developed for the **Smart India Hackathon 2026 (SIH26131)**.

The system empowers Indian farmers with rapid multimodal crop disease and pest diagnosis, intelligent localized advisory, escalation pathways to Agricultural Officers, and central administrative monitoring.

---

## Current Status: Phase 14 Complete
This repository contains:
- **Phase 1**: Foundation & Development Environment
- **Phase 2**: Design System & 34 Reusable UI Components
- **Phase 3**: Application Routing & Layout Architecture
- **Phase 4**: Frontend Authentication, Login, Registration & Session Architecture
- **Phase 5**: Farmer Dashboard & Core Farmer Experience
- **Phase 6**: Crop Problem Reporting & Case Creation Workflow
- **Phase 7**: AI Disease/Pest Detection & Groq Analysis Integration
- **Phase 8**: Agricultural Officer Portal & Case Management Workflow
- **Phase 9**: Administrative Portal, Outbreak Surveillance & Epidemic Heatmaps
- **Phase 10**: Multilingual Localization, Regional Language UX & Final Farmer Experience
- **Phase 11**: Profile, Notifications, Help/FAQ, Privacy & Global UX States
- **Phase 12**: Security Hardening, API Integration Audit & Production Readiness
- **Phase 13**: Deployment Orchestration, PostgreSQL Persistence & CI/CD
- **Phase 14**: Real Database Verification, Deployment Validation & SIH Demo Readiness

---

## Phase 13 — Deployment Orchestration, PostgreSQL Persistence & CI/CD

Phase 13 establishes production deployment orchestration, replaces volatile memory persistence with a resilient PostgreSQL database powered by Prisma ORM, adds automated CI/CD workflows via GitHub Actions, and prepares the platform for supervised field-pilot trials for **SIH26131**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        DOCKER COMPOSE TOPOLOGY                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   Client Web Browser                                                   │
│          │                                                             │
│          ├── HTTP Port 80 (or 5173 Dev)                                │
│          ▼                                                             │
│   ┌───────────────────────────────┐                                    │
│   │  Frontend Service             │                                    │
│   │  • Multi-stage Nginx Alpine   │                                    │
│   │  • React 19 SPA Bundle        │                                    │
│   │  • Hardened CSP / Gzip        │                                    │
│   └──────────────┬────────────────┘                                    │
│                  │                                                     │
│                  ├── REST API calls (http://localhost:8000/api/v1)     │
│                  ▼                                                     │
│   ┌───────────────────────────────┐                                    │
│   │  Backend Service (Node 20)    │                                    │
│   │  • Unprivileged user: node    │                                    │
│   │  • Prisma ORM Engine          │                                    │
│   │  • Server-Side Groq AI        │                                    │
│   └──────────────┬────────────────┘                                    │
│                  │                                                     │
│                  ├── Parameterized Queries (Internal: db:5432)         │
│                  ▼                                                     │
│   ┌───────────────────────────────┐                                    │
│   │  Database Service             │                                    │
│   │  • PostgreSQL 16 Alpine       │                                    │
│   │  • Named Volume: pgdata       │                                    │
│   │  • Bound to 127.0.0.1 (Safe)  │                                    │
│   └───────────────────────────────┘                                    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Verified Development and Deployment Commands
```bash
# Development (Standalone Mode with Resilient Persistence Fallback)
npm run server                 # Launch backend server on http://localhost:8000/api/v1
npm run dev                    # Launch Vite dev server on http://localhost:5173

# Testing & Verification
npm run test:security          # Run 25-scenario automated backend security test suite
npm run test:persistence       # Run 24-scenario PostgreSQL persistence & resilience test suite
npm run test:db-lifecycle      # Run Phase 14 real PostgreSQL lifecycle & restart persistence test
npm run i18n:check             # Verify 100% key parity across EN, TE, HI, KN (497 keys)
npm run lint                   # Run ESLint style & quality checks
npx oxlint                     # Run Oxlint high-speed static analysis
npx tsc -b                     # Run TypeScript compiler typecheck
npm run build                  # Compile production Vite bundle (dist/)

# PostgreSQL & Prisma Commands
npm run db:generate            # Generate Prisma ORM Client binary
npm run db:migrate             # Apply SQL migrations to PostgreSQL (prisma migrate deploy)
npm run db:seed                # Explicitly seed demonstration accounts and pilot cases

# SIH Demonstration Runbook
# See docs/sih-demo-runbook.md for the complete 5-7 minute live demonstration script.

# Docker Deployment (All-in-One Compose)
docker compose up --build -d   # Build and launch db, backend, and frontend containers
docker compose ps              # Check health status of all 3 services
docker compose logs -f backend # View live backend API telemetry
docker compose down            # Gracefully stop containers (preserves pgdata volume)
```

### 2. Environment Variables & Secret Management (`.env.example`)
| Variable | Scope | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend | `8000` | Port for backend HTTP server |
| `NODE_ENV` | Backend | `production` / `development` | Environment mode; triggers production startup checks |
| `VITE_API_BASE_URL` | Frontend | `http://localhost:8000/api/v1` | Public API endpoint accessed by the browser client |
| `DATABASE_URL` | Backend | `postgresql://postgres:postgres@localhost:5432/agri_rakshak?schema=public` | PostgreSQL connection string |
| `DATABASE_REQUIRED` | Backend | `true` / `false` | When `true` (or in production), server strictly requires PostgreSQL and aborts startup if offline |
| `GROQ_API_KEY` | Backend | `gsk_...` | **Server-side only** key for Groq AI pathology engine |
| `GROQ_MODEL` | Backend | `llama-3.3-70b-versatile` | Model identifier for diagnostic vision reasoning |
| `AUTH_SECRET` | Backend | `min-32-char-random-secret` | HMAC-SHA256 signing secret for session tokens |
| `ALLOWED_ORIGINS` | Backend | `http://localhost:5173,http://localhost:80` | CORS allowlist (wildcard with credentials prohibited) |

> [!CAUTION]
> **Zero Secret Leakage Rule:**
> - Never prefix backend secrets (`GROQ_API_KEY`, `DATABASE_URL`, `AUTH_SECRET`) with `VITE_`.
> - Any variable prefixed with `VITE_` is automatically bundled into public client-side JavaScript.
> - The production frontend bundle is verified with zero secret exposures (`grep -rn "gsk_" dist/` returns 0).

### 3. PostgreSQL Database Schema & Persistence Architecture
The database layer uses **Prisma ORM** with clean models:
- **`User`**: Role-based accounts (`farmer`, `officer`, `admin`) with PBKDF2 password hashing (`salt`, `passwordHash`), contact information, and regional jurisdiction.
- **`Case`**: Crop disease cases containing farmer ownership (`farmerId`), agronomic symptoms, uploaded images, structured `aiAnalysis` JSON, and official `officerReview` advisory.
- **`CaseTimeline`**: Audit trail tracking case creation, AI detection, officer review, field-visit scheduling, and status changes.
- **`Notification`**: Role- and user-isolated alerts (`targetRole`, `targetUserId`) with read states.
- **`OutbreakAlert`**: Epidemic alerts for high-risk pathogen clusters (e.g. Pink Bollworm, Early Blight).
- **`Hotspot`**: Geographic cluster telemetry with latitude/longitude coordinates and severity indicators.

### 4. Development Seeding Workflow
To prevent accidental pollution in live production environments, demo data is **never silently seeded in production**.
- Run `npm run db:seed` in development or staging to populate initial test users and demonstration crop cases.
- If run with `NODE_ENV=production`, the seed script refuses execution unless explicitly overridden with `--force`.

### 5. Production Reverse Proxy & HTTPS / SSL Termination
For public deployment on Linux servers (e.g., Ubuntu 22.04 / 24.04 on AWS / DigitalOcean / MeitY Cloud):
1. Point your domain DNS records (A record) to the host server IP:
   - `agrirakshak.in` -> Host IP
   - `api.agrirakshak.in` -> Host IP
2. Install Certbot for Let's Encrypt SSL:
   ```bash
   sudo apt update && sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d agrirakshak.in -d api.agrirakshak.in
   ```
3. Configure Nginx reverse proxy:
   ```nginx
   # /etc/nginx/sites-available/agri-rakshak
   server {
       server_name api.agrirakshak.in;
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto https;
       }
   }
   ```

### 6. Database Backup & Disaster Recovery
- **Backup**: Create an encrypted daily database dump:
  ```bash
  docker compose exec -T db pg_dump -U postgres agri_rakshak | gzip > backup_$(date +%Y%m%d).sql.gz
  ```
- **Restore**: Restore database from backup snapshot:
  ```bash
  gunzip < backup_20261017.sql.gz | docker compose exec -T db psql -U postgres agri_rakshak
  ```

### 7. CI/CD Workflow (`.github/workflows/ci.yml`)
The automated GitHub Actions pipeline triggers on pull requests and pushes to `main`:
1. Clean dependency installation (`npm ci`).
2. Prisma Client generation (`npx prisma generate`).
3. Static code analysis (`npx oxlint`).
4. Linting check (`npm run lint`).
5. TypeScript compiler strict check (`npx tsc -b`).
6. Multilingual 4-locale i18n parity check (`npm run i18n:check`).
7. Phase 13 Persistence & DB test suite (`npm run test:persistence`).
8. Phase 12 Backend API & Security regression suite (`npm run test:security`).
9. Production frontend build (`npm run build`).
10. Frontend bundle secret exposure scan (`grep -rn "gsk_" dist/`).
11. Docker build syntax validation.

### 8. Field Pilot Readiness Checklist
For supervised field demonstrations with farmers and agricultural extension officers, consult the [Field Pilot Checklist](docs/field-pilot-checklist.md).

---

## Phase 12 — Security Hardening, API Integration Audit & Production Readiness

Phase 12 validates and hardens the platform's security boundary, verifies end-to-end frontend/backend integration, and establishes production resilience for **SIH26131**:

```text
HTTP Client / Browser (Port 5173)
        │
        ▼ (Strict CORS Allowlist: http://localhost:5173, etc. / No Wildcards with Credentials)
Security Middleware
  ├── Security Headers: X-Content-Type-Options: nosniff | X-Frame-Options: DENY | HSTS
  ├── Rate Limiter (In-Memory Sliding Window: 10/min Auth & AI, 120/min Global)
  ├── Max Payload Guard: 10MB Content-Length & Stream Size Limiter
  └── HMAC-Signed Token Auth & Role-Based Access Control (RBAC)
        │
        ├── Public / Auth: /api/v1/health, /api/v1/auth/login, /api/v1/auth/register
        ├── Protected Caller: /api/v1/auth/me, /api/v1/profile, /api/v1/notifications
        ├── Farmer Space: /api/v1/dashboard/farmer, /api/v1/cases (Own cases only)
        ├── Officer Space: /api/v1/dashboard/officer, /api/v1/cases/:id/review, /status
        ├── Admin Space: /api/v1/dashboard/admin, /api/v1/analytics/*, /api/v1/admin/users
        └── Groq AI Engine: /api/v1/cases/:id/analyze (20s AbortController, Data Minimization)
```

### 1. Verified Development and Production Commands
```bash
# 1. Start hardened backend server (Port 8000)
npm run server

# 2. Start Vite development server (Port 5173)
npm run dev

# 3. Run automated security regression test suite (15 core security scenarios)
npm run test:security

# 4. Validate 100% 4-locale i18n key parity (en, te, hi, kn)
npm run i18n:check

# 5. Run static lint and oxlint checks
npm run lint
npx oxlint

# 6. Production build check (TypeScript compiler + Vite bundler)
npm run build
```

### 2. Complete API Integration Matrix

| Method | Endpoint | Auth Required | Authorized Roles | Ownership Check | Rate Limit | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/health` | No | Public | No | Global | Live |
| `POST` | `/api/v1/auth/login` | No | Public | No | 10 / min | Live |
| `POST` | `/api/v1/auth/register` | No | Public | No | 10 / min | Live |
| `GET` | `/api/v1/auth/me` | Yes | All Roles | Self | Global | Live |
| `POST` | `/api/v1/auth/logout` | Yes | All Roles | Self | Global | Live |
| `GET` | `/api/v1/profile` | Yes | All Roles | Self | Global | Live |
| `PATCH` | `/api/v1/profile` | Yes | All Roles | Self (id/role locked) | Global | Live |
| `GET` | `/api/v1/notifications` | Yes | All Roles | Role/User Filter | Global | Live |
| `PATCH` | `/api/v1/notifications/:id/read` | Yes | All Roles | Role/User Filter | Global | Live |
| `PATCH` | `/api/v1/notifications/read-all` | Yes | All Roles | Role/User Filter | Global | Live |
| `GET` | `/api/v1/dashboard/farmer` | Yes | `farmer`, `admin` | Own Cases | Global | Live |
| `GET` | `/api/v1/dashboard/officer` | Yes | `officer`, `admin` | Jurisdiction | Global | Live |
| `GET` | `/api/v1/dashboard/admin` | Yes | `admin` | Statewide | Global | Live |
| `GET` | `/api/v1/analytics/hotspots` | Yes | `officer`, `admin` | Statewide | Global | Live |
| `GET` | `/api/v1/analytics/overview` | Yes | `officer`, `admin` | Statewide | Global | Live |
| `GET` | `/api/v1/admin/users` | Yes | `admin` | Statewide | Global | Live |
| `GET` | `/api/v1/cases` | Yes | All Roles | Farmer: Own / Officer: All | Global | Live |
| `GET` | `/api/v1/cases/:caseId` | Yes | All Roles | Farmer: Own (403 if other) | Global | Live |
| `POST` | `/api/v1/cases` | Yes | `farmer`, `admin` | Self | Global | Live |
| `POST` | `/api/v1/cases/:caseId/analyze` | Yes | All Roles | Own Case / Assigned | 10 / min | Live (Groq) |
| `POST` | `/api/v1/cases/:caseId/review` | Yes | `officer`, `admin` | Officer Oversight | Global | Live |
| `PATCH` | `/api/v1/cases/:caseId/status` | Yes | `officer`, `admin` | Officer Oversight | Global | Live |

### 3. Authentication & Authorization Model
- **Token Signing**: HMAC-SHA256 cryptographically signed tokens (`agr_<payload>.<sig>`) generated with `process.env.AUTH_SECRET`. Tokens expire in 24 hours.
- **Role-Based Access Control**:
  - `farmer`: Access limited to farmer dashboard, own cases, crop problem creation, own profile, and farmer advisories. Blocked with `403 Forbidden` from officer review, officer dashboards, admin surveillance, and user directory.
  - `officer`: Access granted to triage queue, diagnostic reviews, status updates, and epidemic hotspots. Blocked from admin settings and user management.
  - `admin`: Full administrative access to statewide metrics, epidemic alerts, and user directory.
- **Data Isolation & Case Ownership**:
  - `GET /api/v1/cases` automatically isolates records so farmers receive only cases matching their identity.
  - `GET /api/v1/cases/:caseId` inspects ownership; attempting to view another farmer's case returns `403 Forbidden`.

### 4. Groq Secret Isolation & Data Minimization
- **Backend-Only Execution**: Groq API calls originate strictly from `server/services/groqService.js`.
- **Zero Frontend Leakage**: Neither the frontend bundle (`dist/`) nor client network calls ever contain `GROQ_API_KEY`.
- **Data Minimization Safeguards**:
  - Farmer name, mobile phone number, and residential street identifiers are redacted from the prompt.
  - The model receives only crop species, growth stage, broad agro-climatic region (e.g. *Varanasi District, Uttar Pradesh*), foliage symptoms, and symptom descriptions.
- **Output Sanitization**:
  - Clamps confidence scores to valid float range `[0.0, 1.0]`.
  - Normalizes severity to safe enum (`mild`, `moderate`, `severe`).
  - Strips HTML `<script>` tags from model recommendations.
  - 20-second bounded timeout via `AbortController` prevents hanging server threads.

### 5. CORS, Rate Limiting & HTTP Security
- **CORS Allowlist**: Managed via `ALLOWED_ORIGINS` (defaults to `http://localhost:5173`, `http://localhost:3000`). Preflight requests from unauthorized origins are rejected with `403 Forbidden`.
- **Rate Limiting**: In-memory token bucket protects against brute-force attacks on `/api/v1/auth/login` (10 req/min) and AI analysis abuse on `/api/v1/cases/:caseId/analyze` (10 req/min).
- **HTTP Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`.
- **Payload Limiting**: Max 10MB payload size prevents memory exhaustion denial of service.

### 6. Known Persistence Limitations
- In-memory data store (`caseStore`, `userStore`, `notificationStore`) resets on server process restart.
- For multi-instance production deployments, replace the in-memory store with an external datastore (PostgreSQL/MongoDB) and distributed cache (Redis) for rate limiting.

---

---

## Phase 11 — Supporting User Experience, Profile, Notifications & Global UX States

Phase 11 completes the end-to-end supporting user experience surrounding the core Agri Rakshak workflows under **SIH26131**:

```text
Global Navigation / Header / Sidebar
  ├── Profile (/profile → Role Redirect to /farmer/profile, /officer/profile, /admin/profile)
  ├── Notifications (/notifications → /farmer/notifications, /officer/notifications)
  ├── Settings (/settings → /farmer/settings, /officer/settings, /admin/settings)
  ├── Help / FAQ (/help) — Farmer, Officer & Admin Topics + Multi-lingual FAQ Search
  ├── About (/about) — SIH 2026 Problem Statement SIH26131 & 3-Tier Architecture
  ├── Privacy (/privacy) — DPDP Act Compliance, Photo Policy & AI Decision Support Notice
  ├── Offline Detection & Recovery Banner (navigator.onLine reactive status)
  ├── Session Expiry & 401 UX Handling (Auto-redirect, state preservation, localized alert)
  ├── Unauthorized Access (/unauthorized) & 404 Not Found (/404) Pages
  └── Consistent Global Loading (Skeletons/Spinners), Error Retries & Empty States
```

### 1. Role-Adaptive Profile Management
- **Role-Aware Information Display**:
  - **Farmer**: Name, Email, Phone, Preferred Language, Village, District, State, Farm Size.
  - **Agricultural Officer**: Name, Email, Phone, Preferred Language, Assigned District, Jurisdiction, Badge Number, Role.
  - **Administrator**: Name, Email, Phone, Preferred Language, Administrative Region, Permissions, Role.
- **Security Guardrails**: Credentials, JWT access tokens, Groq API keys, and internal secrets are strictly excluded from display.
- **Profile Editing & Validation**: Implemented via React Hook Form with localized validation for name, phone, village, district, state, and preferred language.
- **Graceful Backend Integration & Dev Fallback**: `profileService` calls `/api/v1/profile` with transparent `import.meta.env.DEV` fallback when backend profile route is not yet deployed.

### 2. Notifications System & Advisory Feed
- **Structured Notification Categories**:
  - `case_update`: Case status transitions & farmer updates
  - `ai_analysis`: Vision pathology detections & confidence ratings
  - `officer_review`: Agronomist diagnoses & prescription advisories
  - `field_visit`: Extension specialist on-site inspection schedules
  - `escalation`: High-severity epidemic quarantine alerts
  - `admin_alert`: Regional outbreak advisories
  - `system`: Telemetry & vision model synchronization
- **Notification Badge**: Reactive bell badge in header with unread count, responsive ARIA labels, and non-polling cached sync.
- **Role-Aware Case Deep Linking**: Clicking a case notification navigates dynamically to `/farmer/cases/:caseId` or `/officer/cases/:caseId` based on authenticated role.
- **Zero-Notification Empty State**: Localized *"You're all caught up"* empty state with filter reset action.

### 3. Help, FAQ & Multilingual Search
- **Dedicated Help Hub (`/help`)**:
  - 10 Farmer Topics: Problem reporting, photo capture, supported crops, symptom identification, AI confidence scores, severity definitions, case tracking, officer review SLA, and escalation handling.
  - 6 Officer Topics: Triage queue review, AI verification, alternative diagnosis recording, quarantine escalation, and field visit scheduling.
  - 5 Admin Topics: Statewide disease trends, outbreak hotspot clustering, quarantine broadcasts, and AI model health monitoring.
- **Localized FAQ Search**: Instant client-side search dynamically matches against translated question and answer dictionaries for the active regional language (English, Telugu, Hindi, Kannada).

### 4. About & Data Privacy (DPDP Act)
- **SIH 2026 Problem Statement (SIH26131)**: Clear articulation of smallholder empowerment, AI-assisted diagnosis, agronomist verification, and administrative epidemic surveillance.
- **Data Privacy & Consent (`/privacy`)**: Full transparency on data collection, crop leaf photo usage, AI decision-support nature, agronomist access, and DPDP Act compliance.
- **AI Decision-Support Disclaimer**: Prominent disclaimers emphasizing that AI detections serve as decision-support information and do not replace certified agricultural advice.

### 5. Settings & Local Preferences
- **Language Selection**: Immediate locale switching with persistence in `localStorage`.
- **Notification Channels**: User-controlled toggles for SMS outbreak alerts, email reports, and in-app notifications.
- **Accessibility Preferences**: High contrast mode and large font preferences persisted locally.

### 6. Global UX States & Resiliency
- **Offline / Online Recovery Banner**: Non-blocking sticky banner tracking `navigator.onLine` with automatic recovery notification upon reconnection.
- **Session Expiry (401)**: Intercepted in Axios client, clearing stale tokens and redirecting to `/auth/login?expired=1` with pre-filled destination preservation.
- **Unauthorized & Not Found (404)**: Tailored error pages with role-aware dashboard return actions.
- **Confirmation Dialogs**: Accessible modal dialogs for logout confirmation and report cancellation, eliminating native browser `confirm()` popups.

### 7. Backend Dependencies & API Contracts
- `GET /api/v1/profile` & `PATCH /api/v1/profile`: User profile read and update operations.
- `GET /api/v1/notifications`, `PATCH /api/v1/notifications/:id/read`, `PATCH /api/v1/notifications/read-all`: Notification retrieval and status updates.
- *Development Status*: Both services include typed interfaces and local persistent development mocks under `import.meta.env.DEV` to ensure uninterrupted offline and standalone testing.

---

## Multilingual Localization, Regional Language UX & Final Farmer Experience (Phase 10)

Phase 10 implements production-grade multilingual localization and accessibility across the entire Agri Rakshak platform under **SIH26131**:

```text
Language Selection (Header / Nav / Settings)
        ↓
Persist Language Preference ('agrirakshak:language' in localStorage)
        ↓
Translated Navigation & Layouts
        ↓
Translated Farmer Dashboard & Case Tracking
        ↓
Translated Crop Reporting Wizard (Steps 1–4, Review, Submit)
        ↓
Translated AI Diagnostic Cards & Recommendations
        ↓
Translated Officer & Admin Workspaces
        ↓
Accessible Regional-Language Experience (Telugu, Hindi, Kannada, English)
```

### 1. Supported Regional Languages
- **English** (`en`)
- **Telugu (తెలుగు)** (`te`)
- **Hindi (हिन्दी)** (`hi`)
- **Kannada (ಕನ್ನಡ)** (`kn`)

Native language names are rendered in the accessible dropdown selector so farmers and officials can immediately identify their language of choice.

### 2. Architecture & 100% Translation Key Parity
- **Modular Architecture**: Built in `src/i18n/` featuring typed dictionaries, dynamic locale loading, string parameter interpolation, and locale-aware number/date formatters (`formatDate`, `formatNumber`, `formatPercent`).
- **Complete Parity**: All 4 locale resource files (`en/common.ts`, `te/common.ts`, `hi/common.ts`, `kn/common.ts`) maintain **100.0% key parity** across all 330 translation keys.
- **Automated Verification**: Integrated build-time and pre-commit validator `npm run i18n:check` (`scripts/check-i18n.js`) ensuring zero missing keys across locales.

### 3. Language Persistence & Preference Detection
- Preferences persist reliably in browser local storage via `agrirakshak:language`.
- Preference cascade:
  1. Previously selected application language in `localStorage`
  2. Authenticated user's profile preference (`user.preferred_language`)
  3. Client browser locale
  4. English fallback (`en`)
- Switching languages maintains the current URL route, authentication state, and multi-step form progress without page reloads.

### 4. Canonical Models & Scientific Invariance
- **Canonical IDs**: Crops (e.g. `tomato`, `rice`, `cotton`) and symptoms (e.g. `leaf_spots`, `wilting`) utilize stable canonical identifiers in backend API payloads.
- **Localized UI Getters**: `getCropOptions(lang)` and `getLocalizedSymptoms(lang)` provide farmer-friendly regional labels for display while sending standard identifiers to backend services.
- **Taxonomic Integrity**: Scientific taxonomy (e.g. *Alternaria solani*, *Bemisia tabaci*) is preserved in AI results alongside localized vernacular names.

### 5. Form State Invariance
- Seamless multilingual switching during active multi-step crop problem reporting:
  - Form step position is preserved (Step 1 → Step 4).
  - Selected crops and checkboxes remain intact.
  - Attached images and preview URLs remain untouched.
  - Farmer notes and typed text descriptions are safely retained.

### 6. Typography & Regional Font Rendering
- Typography is configured with native Unicode font fallbacks for Dravidian and Devanagari scripts:
  - `Noto Sans`, `Noto Sans Telugu`, `Noto Sans Devanagari`, `Noto Sans Kannada`.
- Styles in `index.html`, `tailwind.config.js`, and `src/index.css` prevent glyph corruption, clipped line heights, and horizontal overflow.

---

## Administrative Portal, Outbreak Surveillance & Epidemic Heatmaps (Phase 9)

Phase 9 implements the governance and decision-support layer for agricultural administrators under **SIH26131**:

```text
Admin Login (admin@agrirakshak.in)
     ↓
Admin Dashboard (/admin/dashboard)
     ↓
District / Regional Surveillance & Case Statistics
     ↓
Crop Disease & Pest Analytics (/admin/analytics)
     ↓
Hotspot / Outbreak Surveillance (/admin/hotspots)
     ↓
Geographic Outbreak Heatmap & Radar Clustering
     ↓
Authoritative Outbreak Alerts & Directives
     ↓
Case Governance & Audit Review (/admin/cases, /admin/cases/:caseId)
     ↓
User Directory & Officer Caseload (/admin/users)
     ↓
Governance Settings (/admin/settings)
```

### 1. Admin Role Security
- Requires `role = 'admin'` via existing `ProtectedRoute` and `RoleRoute`.
- Farmers and Agricultural Officers attempting to access admin-only pages are blocked and routed to `/unauthorized`.
- Unauthenticated requests redirect to `/login`.
- Demonstration Admin Account: `admin@agrirakshak.in` / `Admin@123`.

### 2. Admin Capabilities & Route Architecture
- `/admin/dashboard` — Executive command center with real-time KPI metrics, active outbreak alerts, escalation queues, and quick administrative triggers.
- `/admin/cases` — Comprehensive governance case table with search, district/crop/severity/status filtering, and export capabilities.
- `/admin/cases/:caseId` — Read-only governance and audit inspection workspace clearly delineating Farmer Submission, AI Groq Inference, Officer Clinical Assessment, and Status Timeline without risk of overwriting officer judgments.
- `/admin/analytics` — Multi-dimensional Recharts analytical intelligence suite covering Weekly Case Trends, Disease Distribution, Pest Surges, Crop Impact Breakdown, Severity Proportions, and District Rankings.
- `/admin/hotspots` — Interactive vector map of India's agricultural belts with centroid coordinate projection, animated radar severity rings, density heatmaps, filter controls, and hotspot details side-panel.
- `/admin/users` — Administrative user registry overview showing Farmer/Officer/Admin counts and district officer caseload triage metrics.
- `/admin/settings` — Architecture-ready governance preferences (surveillance intervals, escalation thresholds, data minimization, alert thresholds).

### 3. Backend Endpoints & API Contract
- `GET /api/v1/dashboard/admin` — Executive summary statistics (`totalCases`, `activeCases`, `resolvedCases`, `escalatedCases`, `thisWeekCases`, `aiAnalysesCount`, `affectedDistrictsCount`, `activeOutbreakAlertsCount`, `recentEscalations`).
- `GET /api/v1/analytics/hotspots` — Geospatial outbreak clusters (`id`, `district`, `village`, `latitude`, `longitude`, `caseCount`, `severity`, `dominantIssue`, `trend`, `affectedCrops`).
- `GET /api/v1/analytics/overview?range={7d|30d|90d|6m|1y}` — Multi-dimensional time-series metrics (`caseTrends`, `diseases`, `pests`, `cropImpacts`, `severities`, `districts`).
- `GET /api/v1/admin/users` — User directory counts and officer caseload metrics.
- `GET /api/v1/cases` & `GET /api/v1/cases/:caseId` — Case search, query filters, and governance detail inspection.

### 4. Outbreak Surveillance & Privacy Safeguards
- **Authoritative Outbreak Alerts**: Outbreaks are never declared arbitrarily on the client side; alerts and directives are delivered authoritatively by backend surveillance algorithms (`GET /api/v1/dashboard/admin` and `GET /api/v1/analytics/hotspots`).
- **Data Minimization & Farmer Privacy**: The geographic surveillance system aggregates cases to the village and district centroid level; individual farmer coordinates or residence addresses are never exposed on public or administrative maps.
- **Accessible Visualizations**: Every chart and map provides accompanying accessible summaries, legend indicators, tabular fallbacks, and ARIA labels.

### 5. Development Fallback
- Local development fallback in `devAdmin.ts` guarded strictly by `import.meta.env.DEV`.
- Clearly labeled as development simulated telemetry when backend server is offline; never active in production bundles.

---

---

## Agricultural Officer Portal & Case Management Workflow (Phase 8)

Phase 8 implements the complete clinical agricultural officer workflow for **SIH26131**:

```text
Officer Login (officer@agrirakshak.in)
     ↓
Officer Dashboard (/officer/dashboard)
     ↓
Case Queue (/officer/cases)
     ↓
Open Case (/officer/cases/:caseId)
     ↓
Review Farmer Report & Submitted Photos
     ↓
Review AI Analysis (Groq advisory reference)
     ↓
Officer Assessment & Professional Judgment
     ↓
Update Case Status (PATCH /api/v1/cases/{caseId}/status)
     ↓
Add Officer Review & Advisory (POST /api/v1/cases/{caseId}/review)
     ↓
Optional Field Visit Scheduling
     ↓
Case Tracking & Timeline Updates
```

### 1. Officer Role Security
- Requires `role = 'officer'` via existing `ProtectedRoute` and `RoleRoute`.
- Farmers navigating to `/officer/*` are blocked and redirected to `/unauthorized`.
- Unauthenticated requests redirect to `/login`.
- Demonstration Officer Account: `officer@agrirakshak.in` / `Officer@123`.

### 2. Officer Route Architecture
- `/officer/dashboard` — Operational overview with KPI metrics, urgent triage queue, and quick actions.
- `/officer/cases` — Filterable and searchable case queue (All, Pending, Under Review, AI Analyzed, Escalated, Resolved).
- `/officer/cases/:caseId` — Clinical assessment workspace with photo lightbox gallery, AI reference side-by-side, professional assessment form, and status management.
- `/officer/analytics` — Regional disease hotspot and outbreak telemetry.

### 3. Backend Endpoints & API Contract
- `GET /api/v1/dashboard/officer` — Officer dashboard summary statistics, urgent queue, and activity log.
- `GET /api/v1/cases` — Retrieve cases with server-side query filters (`status`, `severity`, `crop`, `search`).
- `GET /api/v1/cases/:caseId` — Full case record including farmer details, photos, AI analysis, officer review, and timeline.
- `PATCH /api/v1/cases/:caseId/status` — Status transition (`under_review`, `resolved`, `escalated`, `verified`).
- `POST /api/v1/cases/:caseId/review` — Submit officer clinical assessment, agronomic advisory, follow-up flags, and optional field visit.

### 4. Safety & Advisory Boundary
- Distinguishes advisory AI output (Phase 7 Groq) from human agronomist assessment.
- Adheres to safe advisory policy: AI output is strictly decision support; no automated chemical dosage calculation or toxic pesticide mixing instructions.
- All official advisories and treatment instructions come from authorized agricultural officers.

### 5. Development Fallback
- Local development fallback in `devOfficer.ts` guarded strictly by `import.meta.env.DEV`.
- Never active in production bundles.

---

## AI Disease & Pest Detection Workflow (Phase 7)

Phase 7 implements the multimodal crop disease/pest diagnosis and advisory presentation workflow:

```text
Farmer creates crop case
        ↓
Case receives Case ID
        ↓
Farmer opens Case Details (/farmer/cases/:caseId)
        ↓
Farmer requests AI Analysis
        ↓
Agri Rakshak Backend (POST /api/v1/cases/{case_id}/analyze)
        ↓
Groq API (server-side via GROQ_API_KEY)
        ↓
Structured AI analysis (prediction, confidence, severity, recommendations)
        ↓
Backend validates & normalizes result
        ↓
Frontend displays farmer-friendly result
```

### 1. Architecture & API Specifications
- **Frontend Endpoint**: `POST /api/v1/cases/{case_id}/analyze`
- **AI Provider**: Groq API (`llama-3.3-70b-versatile` / `llama-3.1-8b-instant`)
- **Groq Credentials**: Strictly backend / server-side only (`GROQ_API_KEY`)
- **Frontend Security**: The frontend NEVER communicates directly with Groq and never holds or receives the `GROQ_API_KEY`.
- **Axios Client**: Communicates via the centralized Axios client with Phase 4 JWT Bearer authorization interceptor.
- **Development Fallback**: In local dev mode (`import.meta.env.DEV`), seamlessly falls back to `devAnalysis.ts` if backend is offline, clearly labeling results with: *"Development AI Result: This is simulated data and is not a real diagnosis."*

### 2. Phase 7 Component Library (`src/features/cases/components/ai/`)
- `AIAnalysisCard.tsx` — Composite container orchestrating all states and metric displays.
- `AIAnalysisStatus.tsx` — Not started and error retry state presentations.
- `PredictionResult.tsx` — Identified disease/pest label, scientific name, and category badge.
- `ConfidenceIndicator.tsx` — Accessible progress meter with explanatory score context.
- `SeverityIndicator.tsx` — Non-color dependent severity badge (mild, moderate, severe).
- `ObservedSymptoms.tsx` — Symptom checklist observed by the vision model.
- `PossibleCauses.tsx` — Environmental and pathogen drivers.
- `FarmerRecommendations.tsx` — Practical cultural and bio-protection advisory.
- `AIWarningCard.tsx` — Agronomic cautions, officer escalation notice, and AI disclaimer.
- `AIAnalysisSkeleton.tsx` — Honest loading spinner and layout skeleton (no fabricated progress bars).

---

## Crop Problem Reporting Workflow (Phase 6)

The Crop Problem Reporting flow (`/farmer/report`) allows smallholder farmers to file a structured, multimodal crop health report through an accessible 4-step wizard:

### 1. Multi-Step Reporting Architecture
```text
ReportCropPage (/farmer/report)
 ├── ReportProgress (1. Crop & Location → 2. Symptoms → 3. Photos → 4. Review)
 ├── Step 1: CropSelector + LocationFields (Crop name, growth stage, village/district defaults)
 ├── Step 2: SymptomSelector + ProblemDescription (Common symptom chips, description, severity)
 ├── Step 3: CropImageUploader (Thumbnails, remove action, format/size validation, privacy notice)
 ├── Step 4: ReportReview (Summary with per-step Edit triggers, mandatory farmer consent)
 ├── Success View: ReportSuccess (Case ID badge, pending status, triage explanation, action buttons)
 └── Exit Guard: CancelConfirmDialog (Prevents accidental loss of unsaved report data)
```

### 2. Steps Overview
1. **Step 1 — Crop & Farm Information**: Selects crop (e.g. Tomato, Wheat, Cotton, Rice) and growth stage. Pre-fills farmer village and district from authenticated profile session (`useAuth()`).
2. **Step 2 — Problem & Symptoms**: Interactive symptom selection chips (Chlorosis, Necrotic spots, Wilting, Insects, Fruit rot) and detailed narration textarea with character counting and perceived severity level (`low`, `moderate`, `high`).
3. **Step 3 — Crop Photos**: Image attachment area using Phase 2 `FileUpload`. Supports up to 4 photos (JPG, PNG, WEBP, up to 10MB each) with thumbnail previews and remove triggers.
4. **Step 4 — Review & Submit**: Comprehensive summary card with inline "Edit" jumps for any section and mandatory certification checkbox.
5. **Success State**: Displays generated official Tracking ID (e.g. `#CASE-2026-689`) in canonical initial status `Pending Review` with actions to view case details or return to dashboard.

### 3. API Contract & Service Layer (`src/services/caseService.ts`)
- **Endpoint**: `POST /api/v1/cases` (requires authenticated session with JWT bearer token).
- **Hook**: [`useCreateCase()`](file:///c:/Users/SHAJITESH/Agri-Rakshak/src/features/cases/hooks/useCreateCase.ts) encapsulates submission, duplicate submission locking, and user-friendly error normalization.
- **Request Adapter**: Maps form model into clean `CreateCaseRequest` payload.
- **Development Fallback**: In local development (`import.meta.env.DEV`), seamlessly falls back to [`devCases.ts`](file:///c:/Users/SHAJITESH/Agri-Rakshak/src/features/cases/devCases.ts) when backend is offline.

> **AI Boundary Note**: AI disease detection, Groq inference, pathogen classification, and treatment prescriptions are **NOT** part of Phase 6 and will be implemented in **Phase 7**. Cases enter the canonical initial status `pending` upon creation.

---

## Farmer Dashboard Architecture (Phase 5)

The Farmer Dashboard (`/farmer/dashboard`) serves as the primary authenticated command hub for smallholder farmers:
1. **Personalized Header**: Time-sensitive greeting with village/district localization from `useAuth()`.
2. **Primary CTA**: **Report Crop Problem** button routing to `/farmer/report`.
3. **Case Status Summary**: Counter cards for Total, Pending Review, AI Analyzing, and Resolved cases.
4. **Actionable Tasks**: "Things You May Need to Do" section highlighting pending verifications or positive all-caught-up state.
5. **Recent Case Feed**: Visual feed with disease diagnosis, status indicators, and severity badges.
6. **Agricultural Updates**: Official advisories, IMD weather bulletins, and government scheme notices.
7. **Quick Actions**: 4 fast navigation cards.

---

## Authentication & Session Architecture (Phase 4)

- Centralized token & session storage abstraction (`authStorage.ts`).
- Central Axios request/response interceptor with automatic bearer token attachment and 401 session expiration handling (`api.ts`).
- Authentication Context & Provider (`AuthProvider.tsx`) with session bootstrap loader.
- Isolated development auth adapter (`devAuth.ts`) for 1-click testing of Farmer, Officer, and Admin accounts.
- Protected route guards (`ProtectedRoute.tsx`) and role route guards (`RoleRoute.tsx`).

---

## Routing Matrix

Agri Rakshak organizes all user flows into distinct route modules with lazy loading:

### 1. Public Routes (`PublicLayout`)
- `/` — Platform landing overview with portal navigation cards.
- `/about` — Mission details, SIH26131 problem statement, and technology architecture.
- `/help` — Crop leaf photography guide and diagnostic FAQ for farmers.
- `/privacy` — Farm data privacy, geolocation consent, and DPDP Act compliance.
- `/routes` — Interactive testing matrix cataloging all 35+ routes.
- `/showcase` — Interactive Phase 2 reusable UI component library gallery.

### 2. Authentication Routes (`PublicLayout` / `AuthLayout`)
- `/auth/login` — Accessible login page with validation, password visibility toggle, and dev role selector.
- `/auth/register` — Farmer self-registration form with farm location and consent.

### 3. Farmer Experience (`FarmerLayout`)
- `/farmer/dashboard` — Kisan Seva personalized crop care center.
- `/farmer/report` — 4-step crop problem reporting and photo submission workflow.
- `/farmer/cases` — History of reported crop issues and treatments.
- `/farmer/cases/:caseId` — Detailed case record and agronomist prescription.
- `/farmer/detection/:caseId` — Pathogen prediction and confidence scores.
- `/farmer/notifications` — Regional pest alerts and officer advisory messages.
- `/farmer/profile` — Farm acreage, soil characteristics, and village details.
- `/farmer/settings` — Regional language toggle and offline data preferences.

### 4. Agricultural Officer Portal (`OfficerLayout`)
- `/officer/dashboard` — District case triage overview and outbreak metrics.
- `/officer/cases` — Incoming high-risk triage queue.
- `/officer/cases/:caseId` — In-depth diagnostic review and prescription workspace.
- `/officer/analytics` — Regional epidemiological trend charts.
- `/officer/hotspots` — Geospatial outbreak cluster mapping across taluks.
- `/officer/notifications` — Urgent farmer escalations and department circulars.
- `/officer/profile` — Official agronomist badge, credentials, and jurisdiction.
- `/officer/settings` — AI confidence escalation limits and response templates.

### 5. Administrator Governance (`AdminLayout`)
- `/admin/dashboard` — Statewide telemetry, active user volume, and AI health.
- `/admin/users` — Role-based access control and officer center assignment.
- `/admin/cases` — Statewide case throughput and officer SLA monitoring.
- `/admin/model` — AI computer vision latency, confidence, and model drift telemetry.
- `/admin/analytics` — Macro crop loss prevention and economic impact reports.
- `/admin/system` — Microservice API health and worker queue depths.
- `/admin/audit` — Immutable compliance audit logs for administrative actions.
- `/admin/profile` — System administrator credentials.
- `/admin/settings` — Global maintenance banners and platform controls.

### 6. Error & Fallback Routes
- `/unauthorized` — Accessible 403 access restriction page with safe navigation actions.
- `*` — Accessible 404 catch-all page with home link.

---

## Tech Stack
- **Framework & Core**: React 19, TypeScript
- **Form Handling**: React Hook Form
- **Build Tool**: Vite 8 (Code-split production chunks)
- **Styling**: Tailwind CSS v3 with PostCSS & Autoprefixer
- **Design Tokens**: Biophilic palette (#2E7D32, #1B5E20, #F7FBF5, #FFFFFF, #FFB300, #0288D1, #263238)
- **Typography**: Times New Roman global hierarchy
- **Routing**: React Router v7 with route-level lazy loading and `Suspense`
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors (`src/services/api.ts`)
- **Code Quality**: ESLint flat config + TypeScript strict mode

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Run type check and production build
npm run build
```

---

## Next Phase
- **Phase 9 Complete**: Administrative Portal, Outbreak Surveillance & Epidemic Heatmaps is fully implemented and validated.
- **Phase 10 (Future)**: Multilingual localization, offline PWA synchronization, and edge telemetry (awaiting user directive).
