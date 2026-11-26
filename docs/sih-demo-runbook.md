# Agri Rakshak — Smart India Hackathon 2026 Demonstration Runbook

**Project:** Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)  
**SIH Problem Statement:** SIH26131 — AI-Assisted Crop Disease Detection, Surveillance & Advisory System  
**Document Version:** 1.0 (Phase 14 Production & Jury Readiness)  
**Demonstration Time Window:** 5–7 Minutes  

---

## 1. Project Overview & SIH26131 Alignment

Agri Rakshak is an enterprise-grade agricultural decision support platform engineered for Indian farmers, agricultural extension officers, and district agricultural administrators. It addresses **SIH26131** by bridging the communication gap between rural smallholder farmers and district agronomists through:

- **AI Decision Support (Advisory Only):** Multimodal plant pathology reasoning powered by Groq-hosted vision models (Llama 3.3 70B Versatile), delivering rapid diagnostic suggestions with observed symptoms, potential etiologies, and bio-friendly preliminary interventions.
- **Human-in-the-Loop Triaging:** Every critical or high-severity finding can be escalated to authorized Agricultural Officers (KVK / Taluk Directorate) for scientific validation, official prescription advisory, and on-site field visit scheduling.
- **Epidemiological Surveillance:** Geospatial outbreak tracking and hotspot clustering allowing district administrators to proactively allocate resources before fungal or insect infestations reach epidemic proportions.
- **Multilingual Accessibility:** Full 4-language localized interface (English, Telugu, Hindi, Kannada) tailored for vernacular comprehension among diverse agrarian communities.

> **Important Advisory Disclaimer:**  
> All artificial intelligence diagnostics and automated suggestions in Agri Rakshak are provided strictly as decision-support advisories. They do not constitute guaranteed cures or unilateral chemical recommendations. Farmers are advised to consult designated Agricultural Extension Officers before applying scheduled synthetic pesticides.

---

## 2. System Architecture & Component Responsibilities

Agri Rakshak implements a decoupled three-tier architecture ensuring separation of concerns, high throughput, and zero leakage of sensitive credentials:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React 19 SPA Frontend                           │
│  - Tailwind CSS + Lucide Icons + Recharts                              │
│  - Role-based routing (Farmer, Officer, Administrator portals)         │
│  - 4-Language Localization Engine (EN, TE, HI, KN)                     │
│  - Offline-resilient cache & responsive mobile layouts (375px/430px)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST API (Port 8000)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Node.js Core Backend API                          │
│  - Native HTTP server with zero unnecessary framework bloat            │
│  - PBKDF2 Password Hashing (100k iterations) & HMAC-SHA256 Auth Tokens │
│  - Strict Role-Based Access Control (RBAC) & Case Ownership Isolation  │
│  - Rate Limiting, CORS Allowlist, Security Headers (CSP, HSTS)        │
│  - Confidential Groq AI Client (Server-side ONLY; zero key leakage)    │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼ Prisma ORM (v6)                ▼ HTTPS
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│        PostgreSQL 16 Database        │  │       Groq AI Engine         │
│  - User, Case, CaseTimeline,         │  │  - Llama 3.3 70B Versatile   │
│    Notification, OutbreakAlert,      │  │  - JSON Structured Output    │
│    Hotspot tables                    │  │  - Strict Server-Side Calls  │
│  - Atomic Transactions & FK Cascades │  └──────────────────────────────┘
│  - Strict Mode (DATABASE_REQUIRED)   │
└──────────────────────────────────────┘
```

---

## 3. Prerequisites & Environment Configuration

### System Prerequisites
- **Node.js:** v20.x or v22.x LTS (compatible up to Node v25)
- **Package Manager:** `npm` v10+
- **Database (Optional for Demo Fallback, Required for Production):** PostgreSQL 16
- **Docker & Docker Compose (Optional):** For containerized deployment

### Environment File (`.env`)
Create a `.env` file in the project root:

```env
PORT=8000
NODE_ENV=development

# Frontend API base
VITE_API_BASE_URL=http://localhost:8000/api/v1

# PostgreSQL Connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/agri_rakshak?schema=public

# Database Mode (false = development resilient fallback; true = strict mode aborts on DB offline)
DATABASE_REQUIRED=false

# Groq AI Vision Engine (Backend only)
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Cryptographic token signing secret
AUTH_SECRET=agri-rakshak-sih2026-demo-secret-key-32chars

# CORS Origin Allowlist
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
```

---

## 4. Commands to Start Backend, Frontend, and Database

### Option A: Local Bare-Metal Development (Recommended for Fast SIH Live Demo)

1. **Start the Backend API Server:**
   ```bash
   npm run server
   ```
   *Logs will confirm `Server running at http://localhost:8000/api/v1` and database connection state.*

2. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   *Vite server starts at `http://localhost:5173/`.*

### Option B: Docker Compose Full Stack (When Docker Daemon is Active)

```bash
docker compose up --build -d
```
- Frontend UI: `http://localhost/` (Port 80)
- Backend API: `http://localhost:8000/api/v1`
- PostgreSQL: `localhost:5432`

---

## 5. Safe Demo Accounts & Roles

Pre-configured demonstration accounts with pre-hashed PBKDF2 credentials for immediate evaluation:

| Role | Name | Email / Phone | Password | Portal Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Farmer** | Ramesh Patel | `kisan@agrirakshak.in`<br>`+91 98765 43210` | `password123` | File cases, view AI diagnosis, inspect advisories, notifications |
| **Officer** | Dr. Priya Sharma | `officer@agrirakshak.in`<br>`+91 98765 43211` | `password123` | Review queue, issue prescriptions, schedule field visits |
| **Admin** | Rajesh Gupta (IAS) | `admin@agrirakshak.in`<br>`+91 98765 43212` | `password123` | Outbreak surveillance, district hotspots, system telemetry |

*Alternatively, register a new synthetic farmer directly on the `/register` page during the demonstration.*

---

## 6. Recommended 5–7 Minute Live Demonstration Sequence

### Timeline Overview
- **Minute 0:00 – 1:00:** Problem Statement introduction & Farmer Portal Overview
- **Minute 1:00 – 2:30:** Filing a new crop problem & Groq AI diagnostic reasoning
- **Minute 2:30 – 4:00:** Officer verification, triage, and advisory submission
- **Minute 4:00 – 5:00:** Farmer receiving notification, updated case history, and Telugu localization
- **Minute 5:00 – 6:30:** District Admin outbreak surveillance & epidemiological map
- **Minute 6:30 – 7:00:** Architecture summary, security compliance, and Q&A

---

## 7. Step-by-Step Farmer Workflow (Minutes 0:00 – 2:30)

1. Open `http://localhost:5173/login`.
2. Click **"Demo: Farmer"** (auto-fills `kisan@agrirakshak.in` / `password123`).
3. Click **Sign In**. The Farmer Dashboard loads, displaying:
   - Summary cards: Total cases, pending diagnosis, resolved cases, and scheduled visits.
   - Recent cases table with live status badges.
4. Click **"Report New Crop Problem"** or navigate to `/farmer/new-case`.
5. Enter synthetic demonstration data:
   - **Crop Name:** Tomato (टमाटर)
   - **Growth Stage:** Flowering & Fruit Setting
   - **Symptoms:** Select "Dark concentric rings", "Leaf chlorosis (yellowing)", and "Foliage curling".
   - **Description:** "Concentric brown spots with yellow halos spreading on lower tomato leaves after morning mist."
   - **Photo Upload:** Select sample crop photo or use preset demonstration image.
6. Click **"Submit & Run AI Diagnostic"**.
7. The system calls the backend Groq AI pipeline (`/api/v1/analyze/crop-case`).
8. View the persisted AI diagnostic report:
   - Condition Identified: *Early Blight (Alternaria solani)* with 92% confidence.
   - Severity Level: Moderate.
   - Observed Symptoms & Root Etiology.
   - Recommended Organic / Bio-friendly Actions.
   - Official Notice: "Advisory only. Case queued for Agricultural Officer review."

---

## 8. Step-by-Step Officer Review Workflow (Minutes 2:30 – 4:00)

1. Click profile dropdown in upper right and select **"Logout"**.
2. On `/login`, click **"Demo: Officer"** (auto-fills `officer@agrirakshak.in` / `password123`).
3. Click **Sign In**. The Agricultural Officer Portal loads:
   - Triage Queue filtered by priority (Critical, High, Moderate).
   - Summary statistics of pending reviews across Varanasi district.
4. Locate the newly filed or escalated Tomato case (`CASE-2026-104`).
5. Click **"Review Case"**.
6. Inspect the AI diagnostic finding alongside farmer symptoms and photos.
7. Fill out the Official Assessment form:
   - **Assessment:** "Confirmed Early Blight (Alternaria solani). Moderate fungal lesion spread across lower third of canopy."
   - **Validation Outcome:** "Confirmed AI Diagnosis".
   - **Prescription Advisory:** "Prune affected lower leaves immediately. Apply Copper Oxychloride 50% WP @ 2.5g/L or Mancozeb 75% WP @ 2g/L. Repeat after 10 days if humidity persists."
   - **Schedule Field Visit:** Toggle YES, set Date to next Monday, Location to "Rampur Village Plot 2".
   - **Final Status:** "Resolved" (or "Under Review").
8. Click **"Submit Assessment & Notify Farmer"**.
9. The backend atomically records the officer review and creates a `CaseTimeline` event and a targeted `Notification`.

---

## 9. Multilingual & Verification Workflow (Minutes 4:00 – 5:00)

1. Log back in as Farmer (`kisan@agrirakshak.in`).
2. Notice the notification badge in header:
   - Click the **Bell Icon**.
   - Read notification: *"Dr. Priya Sharma issued treatment advisory for your Tomato case."*
3. Navigate to **"My Cases"** (`/farmer/cases`) and select the case.
4. Show the complete **Case Timeline**:
   - `Case Report Created` (Farmer)
   - `AI Diagnostic Analysis Complete` (Agri Rakshak AI)
   - `Officer Assessment & Advisory Recorded` (Dr. Priya Sharma)
   - `Field Visit Scheduled` (Dr. Priya Sharma)
5. **Demonstrate Telugu Localization:**
   - Click the language selector in the top bar.
   - Select **"తెలుగు (Telugu)"**.
   - Highlight that the navigation, status badges ("పరిష్కరించబడింది"), dashboard labels, and advisory headings instantly switch to natural Telugu without page reloads.

---

## 10. Admin Analytics & Surveillance Workflow (Minutes 5:00 – 6:30)

1. Log in as Administrator (`admin@agrirakshak.in` / `password123`).
2. The State / District Epidemiological Dashboard renders:
   - **Regional Outbreak Surveillance:** Active outbreak alert for Early Blight in Varanasi / Nashik clusters.
   - **Hotspot Map:** Interactive geospatial visualization of disease clusters by severity and crop.
   - **Epidemiological Metrics:** 7-day disease trends, officer assignment ratios, and resolution rates.
3. Demonstrate RBAC Isolation:
   - Try navigating to `/admin/surveillance` as a farmer — notice immediate safe redirect or 403 Forbidden display.

---

## 11. Troubleshooting Guide for Common Live Issues

| Symptom | Probable Cause | Instant Resolution |
| :--- | :--- | :--- |
| **Backend offline or connection refused** | Backend server is not running | Run `npm run server` in a dedicated terminal window. Check `http://localhost:8000/api/v1/health`. |
| **Groq AI returns fallback diagnosis** | Missing or rate-limited `GROQ_API_KEY` | The backend automatically activates high-accuracy cached agronomic heuristic fallback. The demonstration continues seamlessly. |
| **Database connection error** | PostgreSQL daemon is not started | In development mode, Agri Rakshak automatically activates resilient in-memory store. If `DATABASE_REQUIRED=true` was set, verify `DATABASE_URL` or set `DATABASE_REQUIRED=false`. |
| **Login fails with invalid credentials** | Cached browser state or typed typo | Use the quick demo buttons on `/login` ("Demo: Farmer", "Demo: Officer", "Demo: Admin"). |
| **Port 8000 in use** | Stray Node process running in background | In PowerShell: `Get-Process -Name node \| Stop-Process -Force`, then restart `npm run server`. |

---

## 12. Synthetic Demo Data Reset Procedure

To reset the demonstration environment to a pristine initial state:

1. **For In-Memory / Standalone Mode:**
   - Restart the backend server (`Ctrl+C` then `npm run server`).
   - The store resets to standard SIH demo seed records.

2. **For PostgreSQL Database Mode:**
   ```bash
   # Reset database tables and apply clean migrations
   npx prisma migrate reset --force
   # Seed demonstration accounts and baseline cases
   npm run db:seed
   ```

---

## 13. Scope Boundary: Implemented vs. Future Roadmap

| Feature Area | Current Implementation Status (SIH 2026) | Future Field-Pilot Roadmap |
| :--- | :--- | :--- |
| **AI Diagnosis** | Server-side Groq Llama 3.3 70B vision reasoning with agronomic structuring | Fine-tuned lightweight edge models (MobileNetV4) for zero-connectivity offline mobile inference |
| **Officer Portal** | Web-based triage, prescription advisory, and visit scheduling | Dedicated Android mobile app with GPS geotagged photo inspection |
| **Surveillance** | Geospatial district cluster aggregation and trend indicators | Automated ICAR / State Ag department satellite weather telemetry integration |
| **Persistence** | PostgreSQL via Prisma ORM + resilient standalone memory fallback | Sharded regional multi-master PostgreSQL replication for nationwide scalability |
| **Notifications** | In-app real-time notification center with role isolation | Automated vernacular SMS (Kisan Call Center / DLT gateway) and WhatsApp Business API integration |

---

*Agri Rakshak — Smart India Hackathon 2026 (SIH26131)*  
*Engineered for agricultural resilience, transparency, and farmer empowerment.*
