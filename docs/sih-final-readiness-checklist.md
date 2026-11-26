# Agri Rakshak — SIH 2026 Final Demonstration Readiness Checklist

**Project:** Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)  
**Problem Statement:** SIH26131 — AI-Assisted Crop Disease Detection, Surveillance & Advisory System  
**Document Version:** 2.0 (Phase 16 Post-Audit Verified)  
**Target Event:** Smart India Hackathon 2026 Grand Finale / Jury Evaluation  
**Last Audit Date:** October 17, 2026  

---

## 1. Presentation & Demo Rehearsal Checklist

- [x] **Slide Deck Available:** `docs/Agri_Rakshak_SIH_2026.pptx` verified and accessible (12 widescreen slides, 488 KB).
- [x] **Timing Rehearsed:** Full live walkthrough rehearsed within the 5–7 minute window (see `docs/sih-demo-script.md`).
- [x] **Slide Delivery Coached:**
  - [x] Slide 1–3: Problem statement and farmer challenges delivered under 1 min 30 sec.
  - [x] Slide 4–8: Live product demonstration (Farmer report -> Groq AI -> Officer triage) executed within 3 min 30 sec.
  - [x] Slide 9–10: Telugu localization, admin surveillance, and security safeguards covered in 1 min.
  - [x] Slide 11–12: Honest verification evidence and roadmap completed in 30 sec.
- [x] **Presenter Roles Assigned:** 1 Lead Presenter (narrating value proposition) and 1 Driver (clicking and navigating UI).
- [x] **Judges Q&A Ready:** Team reviewed all 25 anticipated questions in `docs/sih-judges-qa.md`.

---

## 2. Infrastructure & Service Startup Checklist

- [x] **Backend Server Active:**
  - Command: `npm run server`
  - URL: `http://localhost:8000/api/v1`
  - Health check returns HTTP 200: `http://localhost:8000/api/v1/health`
  - Verified output: `database: "standalone_fallback"`, `databaseDetails: { status: "fallback", required: false, mode: "standalone_in_memory" }`, `groqConfigured: true`.
- [x] **Frontend Development Server Active:**
  - Command: `npm run dev`
  - URL: `http://localhost:5173/`
  - Returns HTTP 200 and loads clean login screen.
- [x] **Route Aliases Verified:** `/login`, `/signin`, `/register`, `/signup`, `/farmer/new-case` redirect cleanly without 404.
- [x] **Port Availability:** Ports `5173` and `8000` verified free of third-party process conflicts.
- [x] **Network / Proxy Settings:** Browser configured to connect directly to `localhost` without corporate proxy interference.

---

## 3. Credentials & Demonstration Accounts Checklist

All test accounts use PBKDF2 hashed credentials pre-populated in the platform:

| Role | Username / Email | Password | Pre-Demo Verification |
| :--- | :--- | :--- | :---: |
| **Farmer** | `kisan@agrirakshak.in` | `password123` | [x] Verified Login |
| **Officer** | `officer@agrirakshak.in` | `password123` | [x] Verified Login |
| **Admin** | `admin@agrirakshak.in` | `password123` | [x] Verified Login |

- [x] One-click demo credential buttons on `http://localhost:5173/login` verified functioning (*"Demo: Farmer"*, *"Demo: Officer"*, *"Demo: Admin"*).

---

## 4. Groq AI Engine & Contingency Backup Checklist

- [x] **API Key Availability:** `GROQ_API_KEY` present in local `.env` file (server-side only).
- [x] **Zero Public Exposure:** Verified `.env` is listed in `.gitignore` and `dist/` contains zero key traces.
- [x] **Cloud Connectivity Test:** Validated server-side AI pipeline schema parsing and structured output.
- [x] **Decision-Support Guardrails:** AI findings explicitly labeled advisory-only; chemical pesticides require officer validation.
- [x] **Offline Fallback Ready:** In the event of cloud network drop or Groq rate limiting, backend automatically triggers internal agronomic heuristic engine, ensuring zero interruption during jury presentation.

---

## 5. UI, Multilingual & Mobile Verification Checklist

- [x] **Telugu Localization Verified:**
  - Switch language to **"తెలుగు (Telugu)"** via top-right dropdown.
  - Verified labels ("పరిష్కరించబడింది", "కొత్త కేసు", "సమస్య నివేదించండి") render cleanly with 100% key parity.
- [x] **Hindi & Kannada Parity Verified:** Verified via automated script `npm run i18n:check` (497/497 keys across all 4 locales).
- [x] **Responsive Mobile Layouts:**
  - Tested at **375px** width (iPhone SE).
  - Tested at **430px** width (Modern Android).
  - Touch targets exceed 44x44px; hamburger navigation operates smoothly.

---

## 6. Synthetic Data Integrity & Clean Reset Procedure

- [x] **Synthetic Data Confirmation:** All demo records are strictly synthetic test cases (`CASE-2026-104`, `CASE-2026-092`, `CASE-2026-081`, `CASE-2026-065`). No real personal farmer data is exposed.
- [x] **Instant Reset Procedure:**
  - To return to pristine demonstration state: Restart backend server (`Ctrl+C` then `npm run server`).
  - To reset PostgreSQL if running: `npx prisma migrate reset --force && npm run db:seed`.

---

## 7. Known Infrastructure Status & Transparent Disclosures

*Treat these items with absolute honesty during jury evaluation:*

- [ ] **Local PostgreSQL Daemon:** **BLOCKED** on current development workstation (PostgreSQL service not installed on local host machine).
- [ ] **Docker Compose Runtime:** **BLOCKED** on current development workstation (Docker daemon not installed on local host machine).
- [x] **Database Fail-Safe Verified:** `DATABASE_REQUIRED=true` verified to exit safely with code 1 instead of silent fallback.
- [x] **CI Ephemeral Database:** Configured in `.github/workflows/ci.yml` using `postgres:16-alpine` service container; verified ready for remote runner execution.
- [x] **AI Model Scope:** Transparently disclosed as hosted Groq LLaMA 3.3 70B vision reasoning with agronomic prompts, **NOT** a custom-trained neural network.

---

## 8. Official SIH Submission Compliance Checklist

*Note: Specific submission deadlines, official presentation templates, and file formats must be cross-verified against the team's official SIH 2026 dashboard notifications.*

- [x] Verify if an official PPTX template was provided by the SIH organizing committee; if so, copy slide content from `docs/Agri_Rakshak_SIH_2026.pptx` into the required template.
- [x] Verify maximum video duration requirements if a video demo upload is requested (typically 3–5 minutes).
- [x] Confirm code repository access permissions (public repository or add SIH evaluator accounts as collaborators).
- [x] Confirm that no confidential API keys (`GROQ_API_KEY`, production database passwords) are committed to the public Git repository.
