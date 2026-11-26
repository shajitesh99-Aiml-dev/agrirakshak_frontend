# Agri Rakshak — Technical Submission Summary

**Project:** Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)  
**Hackathon:** Smart India Hackathon 2026  
**Problem Statement:** SIH26131 — AI-Assisted Crop Disease Detection, Surveillance & Advisory System  
**Repository Workspace:** `d:/Agri-Rakshak`  
**Current Phase:** Phase 15 (Final Submission Package)  
**Document Classification:** Official Technical Summary  

---

## 1. Problem Statement Alignment

Under **SIH26131**, Indian agriculture experiences substantial annual economic losses due to plant pathogens, late detection, and severe shortages of field agronomists. Rural farmers often cannot distinguish lookalike pathologies, leading to excessive chemical pesticide applications that harm soil biodiversity, increase farmer debt, and leave chemical residues in food chains.

Agri Rakshak delivers an integrated decision-support and surveillance platform engineered to:
1. Provide rapid, multimodal preliminary pathology triage using state-of-the-art vision reasoning.
2. Maintain human-in-the-loop validation by routing severe and high-risk cases to designated Agricultural Officers (KVK/Taluk agronomists).
3. Deliver vernacular advisories in 4 major Indian languages (English, Telugu, Hindi, Kannada).
4. Provide state and district administrators with geospatial disease outbreak surveillance to prevent widespread agricultural epidemics.

---

## 2. Functional Modules

The platform is decomposed into five core functional modules:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AGRI RAKSHAK MODULES                            │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. Farmer Portal   │ 2. AI Reasoning    │ 3. Officer Portal            │
│  • 4-Step Wizard   │  • Groq LLaMA 3.3  │  • Priority Triage Queue     │
│  • Symptom Tagging │  • JSON Structuring│  • Side-by-Side Photo Review │
│  • Case Tracking   │  • Severity Tiers  │  • Prescription Advisory     │
│  • Vernacular Feed │  • Auto-Escalation │  • Field Visit Scheduling    │
├────────────────────┴────────────────────┼──────────────────────────────┤
│ 4. Surveillance & Admin Dashboard       │ 5. Security & Infrastructure │
│  • Geospatial Hotspot Clusters          │  • PBKDF2 (100k) & HMAC Auth │
│  • Epidemiological Moving Averages      │  • Multi-Tier RBAC Guards    │
│  • Officer Workload Distribution        │  • Dual-Mode Prisma Layer    │
│  • Active Regional Outbreak Alerts      │  • Zero Secret Exposure      │
└─────────────────────────────────────────┴──────────────────────────────┘
```

---

## 3. Technology Stack

| Layer | Component | Version / Specification | Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `19.2.8` | Concurrent rendering, stable hooks, zero-latency component updates |
| **Bundler & Tooling** | Vite | `8.3.4` | Ultra-fast HMR and optimized production tree-shaking |
| **Styling** | Tailwind CSS | `3.4.19` | Responsive design system, dark mode tokens, accessible contrast |
| **Icons & Charts** | Lucide React / Recharts | `1.54.0` / `3.10.1` | Lightweight SVG icons and responsive telemetry visualization |
| **Backend Runtime** | Node.js (ES Modules) | `20.x` / `22.x` / `25.x` | Native HTTP server without heavy framework overhead |
| **Database ORM** | Prisma Client & CLI | `6.19.3` | Type-safe queries, migration lifecycle, atomic transaction support |
| **Relational Database** | PostgreSQL | `16 Alpine` | ACID relational guarantees, JSONB document storage, foreign keys |
| **AI Vision Engine** | Groq Cloud API | `llama-3.3-70b-versatile` | Ultra-fast multimodal vision reasoning (<800ms inference) |
| **Quality & Linting** | ESLint / Oxlint | `10.12.0` / `1.81.0` | Comprehensive style enforcement and ultra-fast static analysis |
| **Containerization** | Docker & Compose | Multi-stage Dockerfiles | Hardened production deployment topology with unprivileged execution |

---

## 4. Architecture and Data Flow

### Architecture Blueprint
- **Client Tier:** React 19 Single Page Application communicating over HTTP REST with the backend on port 8000. Client code never directly references external cloud providers or database hosts.
- **Middleware Tier:** In-memory sliding-window rate limiting, origin allowlist CORS, security headers (CSP, HSTS, X-Frame-Options), body parser with strict size caps (1MB auth, 10MB general), and HMAC-SHA256 bearer token validator.
- **Service Tier:** Native HTTP route dispatchers for authentication, cases, AI diagnostic proxy, officer triage, notifications, and administrative surveillance.
- **Persistence Tier:** Prisma ORM interfacing with PostgreSQL 16 in strict mode (`DATABASE_REQUIRED=true`) or falling back to an in-memory Map store in development mode (`DATABASE_REQUIRED=false`).
- **External AI Tier:** Server-to-server HTTPS communication between the Node.js backend and Groq Cloud.

### End-to-End Workflow Sequence
1. **Case Ingestion:** Farmer selects crop, symptoms, attaches leaf photo, accepts consent, and submits case.
2. **AI Diagnostic Inference:** Backend forwards image and symptoms to Groq vision model; inference returns structured JSON (condition, scientific name, confidence score, severity tier, bio-control actions).
3. **Automated Triage Routing:** High-severity conditions auto-escalate to `Status: Escalated` and enter the Officer Triage Queue.
4. **Human Verification:** Agronomist inspects case, verifies diagnosis, issues chemical/bio prescription advisory, and optionally schedules an on-site field inspection.
5. **Atomic Persistence:** Backend applies updates atomically via `prisma.$transaction`.
6. **Notification & Vernacular Delivery:** Farmer receives immediate in-app notification; case timeline updates; regional admin surveillance captures cluster telemetry.

---

## 5. API and Role Boundaries (RBAC)

The platform enforces three strict role tiers:

| Route Path | Allowed Roles | Method | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/v1/health` | Public | `GET` | Service uptime and structured database telemetry |
| `/api/v1/auth/login` | Public | `POST` | PBKDF2 password authentication and token issue |
| `/api/v1/auth/register` | Public | `POST` | Farmer self-registration |
| `/api/v1/cases` | Farmer, Admin | `POST`, `GET` | Create case, list owned cases (filtered by `farmerId`) |
| `/api/v1/cases/:id` | Owner, Officer, Admin | `GET` | Retrieve case details (tenant ownership enforced) |
| `/api/v1/analyze/crop-case` | Farmer, Admin | `POST` | Execute server-side Groq AI vision inference |
| `/api/v1/dashboard/farmer` | Farmer, Admin | `GET` | Farmer summary metrics |
| `/api/v1/dashboard/officer` | Officer, Admin | `GET` | Officer triage queue and workload summary |
| `/api/v1/cases/:id/review` | Officer, Admin | `POST` | Record official agronomist advisory |
| `/api/v1/dashboard/admin` | Admin ONLY | `GET` | State and district epidemiological summary |
| `/api/v1/surveillance/*` | Admin ONLY | `GET` | Hotspots, outbreak alerts, and telemetry |

*Cross-tenant violations (e.g. a farmer accessing another farmer's case or an officer accessing admin surveillance) are rejected with HTTP 403 Forbidden.*

---

## 6. AI Integration & Output Validation

- **Provider:** Groq Cloud API using `llama-3.3-70b-versatile`.
- **Confidentiality:** The `GROQ_API_KEY` is maintained **strictly server-side**.
- **Output Schema:** Forced JSON schema with guaranteed fields:
  ```json
  {
    "prediction": {
      "label": "Early Blight (Alternaria solani)",
      "scientificName": "Alternaria solani",
      "confidence": 0.92,
      "category": "disease"
    },
    "severity": "moderate",
    "explanation": "Concentric circular brown lesions with yellow halo borders...",
    "observedSymptoms": ["Concentric circular lesions", "Chlorosis"],
    "possibleCauses": ["Fungal spore survival in crop debris"],
    "recommendations": ["Prune infected lower foliage", "Apply Trichoderma viride bio-fungicide"],
    "requiresOfficerEscalation": false,
    "isMock": false
  }
  ```
- **Advisory Framing:** Output is visually marked as a decision-support advisory. The system disallows automated chemical pesticide orders without human officer sign-off.
- **Heuristic Fallback:** If cloud API limits or network latency interrupts external inference, the backend falls back to an internal agronomic expert heuristic engine, ensuring zero service disruption during field operations.

---

## 7. Privacy and Security Controls

1. **Password Security:** PBKDF2 with SHA-256, 100,000 rounds, 16-byte unique cryptographic salt. Password hashes and salts are stripped from all API outputs.
2. **Session Security:** Cryptographic HMAC-SHA256 bearer tokens with 8-hour expiration.
3. **Zero Secret Leakage:** Production bundle scanned with `grep -rn "gsk_" dist/` — verified 0 key patterns in client assets.
4. **Input Sanitization:** Path traversal patterns in Case IDs are sanitized; empty crop names and invalid mimetypes are rejected with HTTP 422.
5. **Defensive HTTP Headers:** Content-Security-Policy (CSP), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
6. **Sliding-Window Rate Limiting:** In-memory request tracking returning HTTP 429 upon threshold violation.

---

## 8. Verification Matrix & Execution Evidence

| Test / Gate | Command | Execution State | Result | Evidence |
| :--- | :--- | :---: | :---: | :--- |
| **ESLint Quality Gate** | `npm run lint` | Locally Executed | **PASS** | 0 errors across workspace |
| **Oxlint Static Analysis** | `npx oxlint` | Locally Executed | **PASS** | 0 errors, 0 warnings across 280 files (74ms) |
| **TypeScript Strict Compiler** | `npx tsc -b` | Locally Executed | **PASS** | 0 type errors; clean compilation |
| **Multilingual i18n Parity** | `npm run i18n:check` | Locally Executed | **PASS** | 100% key parity (497/497 keys across EN, TE, HI, KN) |
| **Security Regression Suite** | `npm run test:security` | Locally Executed | **PASS** | 25 Passed, 0 Failed |
| **Persistence Unit Suite** | `npm run test:persistence` | Locally Executed | **PASS** | 24 Passed, 0 Failed |
| **Strict Database Abort** | `DATABASE_REQUIRED=true node server/server.js` | Locally Executed | **PASS** | Aborts with exit code 1 when DB is unreachable |
| **Frontend Production Build** | `npm run build` | Locally Executed | **PASS** | Bundle compiled in 1.52s |
| **Bundle Secret Isolation** | Custom scan script | Locally Executed | **PASS** | 0 secret patterns detected in `dist/` |
| **Real DB Lifecycle Test** | `npm run test:db-lifecycle` | Locally Executed | **BLOCKED** | Exited with `[BLOCKED] PostgreSQL is offline or unreachable.` Host lacks local PostgreSQL/Docker. |
| **Docker Compose Runtime** | `docker compose up` | Locally Executed | **BLOCKED** | Host machine has no Docker daemon installed. |
| **GitHub Actions Remote CI** | Remote GitHub dispatch | Inspected / Unexecuted | **NOT RUN** | CI workflow `.github/workflows/ci.yml` is configured with `postgres:16-alpine` service container; awaiting remote git push. |

---

## 9. Current Operational Limitations

1. **Local Host Infrastructure:** The development workstation lacks Docker and local PostgreSQL, meaning full container runtime verification must execute on a cloud runner or Docker-enabled machine.
2. **Cloud AI Dependency:** Multimodal vision reasoning relies on Groq Cloud; zero-connectivity offline inference currently falls back to agronomic heuristic rules.
3. **Experimental Synthetic Scope:** Platform evaluated on representative crops and synthetic farmer datasets; has not yet completed formal multi-village field trials.

---

## 10. Future Development Roadmap

1. **Edge Quantized Vision Models:** Deploy MobileNetV4 / YOLO-NAS quantized via ONNX / TFLite for zero-connectivity on-device offline diagnosis.
2. **Offline Data Sync:** Local browser storage using `IndexedDB` with automated bi-directional synchronization upon cellular reconnection.
3. **Vernacular DLT SMS & WhatsApp Integration:** Direct push notifications of certified officer advisories to feature phones via Kisan Call Center gateways.
4. **Satellite Climate Correlation:** Ingesting relative humidity and precipitation feeds from IMD / ICAR to predict microclimate spore germination risks.
5. **Formal Field Trials:** Pilot deployment in partnership with district Krishi Vigyan Kendras (KVKs).
