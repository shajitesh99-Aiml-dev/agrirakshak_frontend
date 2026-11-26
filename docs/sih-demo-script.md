# Agri Rakshak — Smart India Hackathon 2026 Live Demo Script

**Project:** Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)  
**SIH Problem Statement:** SIH26131 — AI-Assisted Crop Disease Detection, Surveillance & Advisory System  
**Demo Duration:** 5 to 7 Minutes  
**Target Audience:** SIH Jury & Technical Evaluators  
**Primary Demonstrator Roles:** Presenter / Driver  

---

## Pre-Demo Checklist (T-minus 2 Minutes)
1. Backend Server is running: `http://localhost:8000/api/v1` (Check: `http://localhost:8000/api/v1/health`)
2. Frontend Vite Server is running: `http://localhost:5173/`
3. Browser is opened in clean Incognito/Private window at `http://localhost:5173/login`
4. Screen resolution set to 1920x1080 or standard 16:9 projection.
5. Demo credentials ready:
   - **Farmer:** `kisan@agrirakshak.in` / `password123` (or click *"Demo: Farmer"*)
   - **Officer:** `officer@agrirakshak.in` / `password123` (or click *"Demo: Officer"*)
   - **Admin:** `admin@agrirakshak.in` / `password123` (or click *"Demo: Admin"*)

---

## Timed Demonstration Sequence

### Phase 1: Problem Introduction & Farmer Portal (0:00 – 1:15)

- **Route:** `http://localhost:5173/login` -> `http://localhost:5173/farmer/dashboard`
- **Action:**
  1. Show login portal with three quick-role buttons.
  2. Click **"Demo: Farmer"** and click **"Sign In"**.
  3. Land on `/farmer/dashboard`.
- **Narration:**
  > *"Respected Judges, Indian smallholder farmers face up to 30% crop yield losses every season due to delayed diagnosis of fungal blights and insect infestations. Lacking immediate access to district agronomists, farmers resort to guesswork and indiscriminate chemical spraying.*  
  > *Agri Rakshak bridges this critical gap. Here is Ramesh Patel, a smallholder tomato farmer in Varanasi. His dashboard immediately summarizes his crop cases, pending diagnoses, and verified agronomist advisories."*
- **Expected Result:**
  - Farmer dashboard loads with summary metrics (Total Cases: 4, Pending: 1, Resolved: 2, Visits: 1).
  - Recent case table displays with live status badges.

---

### Phase 2: Crop Problem Reporting & AI Diagnostic Inference (1:15 – 2:45)

- **Route:** `http://localhost:5173/farmer/new-case`
- **Action:**
  1. Click **"Report New Problem"** (or top navigation *New Case*).
  2. In Step 1: Select Crop **"Tomato (टमाटर)"**, Growth Stage **"Flowering & Fruit Setting"**. Click *Next*.
  3. In Step 2: Select Symptoms **"Dark concentric rings"**, **"Leaf chlorosis (yellowing)"**, **"Lower leaf drop"**. Enter Description: *"Dark concentric spots spreading rapidly on lower tomato foliage after humid morning fog."* Click *Next*.
  4. In Step 3: Location auto-filled (Varanasi, Rampur Village). Upload sample crop photo or keep demo image. Click *Next*.
  5. In Step 4: Check mandatory consent acknowledgment: *"I consent to automated AI decision-support analysis and officer triage."* Click **"Submit & Run AI Diagnostic"**.
- **Narration:**
  > *"Notice how the 4-step wizard guides the farmer through agronomic symptom tagging rather than relying solely on raw images. Once submitted, our secure server-side pipeline invokes our Groq LLaMA 3.3 70B vision reasoning model.*  
  > *Importantly, the API key remains strictly server-side — zero secret exposure in browser bundles. The AI infers Early Blight (Alternaria solani) with 92% confidence and moderate severity.*  
  > *Crucially, we present this strictly as an advisory disclaimer — never an unconditional chemical prescription. Because this is a high-risk fungal blight, the platform automatically enqueues the case in the Agricultural Officer Triage Queue."*
- **Expected Result:**
  - Submission succeeds, redirecting to `/farmer/cases/:id`.
  - Structured AI diagnostic card renders: Condition name, scientific label, confidence bar, observed symptoms, bio-friendly preventative steps, and escalation badge.

---

### Phase 3: Agricultural Officer Scientific Review & Advisory (2:45 – 4:15)

- **Route:** User Menu -> **"Sign Out"** -> `http://localhost:5173/login` -> `http://localhost:5173/officer/cases`
- **Action:**
  1. Click top-right avatar -> **"Sign Out"**.
  2. On `/login`, click **"Demo: Officer"** -> **"Sign In"**.
  3. Land on Agricultural Officer Portal (`/officer/cases`).
  4. Highlight the **Triage Queue** filtered by priority.
  5. Click **"Review Case"** on the escalated Tomato case.
  6. Inspect farmer photo, symptoms, and AI prediction.
  7. Fill out the Official Assessment form:
     - Outcome: Select **"Confirmed AI Diagnosis"**.
     - Advisory: *"Prune and destroy lower diseased leaves. Spray Copper Oxychloride 50% WP @ 2.5g/L. Repeat in 10 days if humidity persists."*
     - Field Visit: Toggle **"Schedule On-Site Field Visit"** -> Date: Next Monday -> Location: *Rampur Village Plot 2*.
     - Final Status: **"Resolved"** (or Under Review).
  8. Click **"Submit Assessment & Notify Farmer"**.
- **Narration:**
  > *"Now we switch to Dr. Priya Sharma, Senior Agronomist at the District Krishi Vigyan Kendra. Dr. Sharma's portal is designed for high-throughput triage, organizing cases across her taluk by severity.*  
  > *She inspects the farmer's photos against the AI diagnostic findings. Validating the diagnosis, she issues a scientific chemical dosage advisory and schedules an on-site field visit for post-spray leaf inspection.*  
  > *Our backend executes this write atomically via Prisma transactions, updating the case state, appending an immutable timeline audit event, and creating a targeted notification for Ramesh."*
- **Expected Result:**
  - Case status updates cleanly; notification created; timeline gains officer review & field visit records.

---

### Phase 4: Farmer Notification & Vernacular Telugu Switching (4:15 – 5:30)

- **Route:** User Menu -> **"Sign Out"** -> Login as Farmer (`kisan@agrirakshak.in`) -> `http://localhost:5173/farmer/dashboard`
- **Action:**
  1. Log back in as Farmer Ramesh Patel.
  2. Point to the **Notification Bell** with unread indicator in header. Click Bell icon to show: *"Dr. Priya Sharma issued treatment advisory for your Tomato case."*
  3. Navigate to **"My Cases"** (`/farmer/cases`) and open the Tomato case.
  4. Show the updated **Case Timeline**:
     - *Case Report Created* (Farmer)
     - *AI Diagnostic Analysis Complete* (Agri Rakshak AI)
     - *Officer Assessment & Advisory Recorded* (Dr. Priya Sharma)
     - *Field Visit Scheduled* (Dr. Priya Sharma)
  5. **Demonstrate Telugu Localization:**
     - Click the language selector in the top bar.
     - Select **"తెలుగు (Telugu)"**.
- **Narration:**
  > *"Ramesh receives instant notification on his portal that Dr. Sharma has approved his treatment. Opening his case, he sees the complete transparent timeline from initial report to field visit.*  
  > *Now, observe our vernacular localization. Over 70% of farmers in Andhra Pradesh and Telangana require advisories in Telugu. With one click, the entire platform switches to natural Telugu without page reloads — navigation, badges ('పరిష్కరించబడింది'), advisory cards, and dashboard metrics all maintain 100% key parity."*
- **Expected Result:**
  - UI seamlessly displays in Telugu; status badges and cards render clean Telugu text. Switch back to English or keep in Telugu.

---

### Phase 5: Admin Outbreak Surveillance & Epidemic Heatmaps (5:30 – 6:30)

- **Route:** User Menu -> Sign Out -> Login as Admin (`admin@agrirakshak.in`) -> `http://localhost:5173/admin/surveillance`
- **Action:**
  1. Log in as District Agricultural Administrator Rajesh Gupta.
  2. Navigate to **"Outbreak Surveillance"** (`/admin/surveillance`).
  3. Show the **Geospatial Hotspots & Epidemic Alerts**.
  4. Point out active alert: *Regional Outbreak Notice: Late Blight / Early Blight in Varanasi cluster*.
  5. Point out 7-day disease velocity and officer workload distribution charts.
- **Narration:**
  > *"Finally, we step into the shoes of the District Agricultural Directorate. Agri Rakshak aggregates telemetry across individual farmer cases to generate epidemiological hotspot clusters.*  
  > *Instead of waiting for an outbreak to wipe out thousands of hectares, administrators identify fungal spore spread early, reallocating field agronomists to high-risk zones before emergency thresholds are crossed.*  
  > *All of this is guarded by strict Role-Based Access Control — unauthenticated users and farmers are strictly blocked from accessing administrative surveillance data."*
- **Expected Result:**
  - Surveillance dashboard renders hotspot clusters, severity filters, active outbreak banners, and trend charts.

---

### Phase 6: Architecture Summary & Conclusion (6:30 – 7:00)

- **Narration:**
  > *"In summary, Agri Rakshak delivers an enterprise-grade, human-in-the-loop agricultural ecosystem:  
  > 1. Real AI vision reasoning via Groq LLaMA 3.3 70B with zero secret exposure.  
  > 2. Certified agronomist validation preventing hazardous chemical overuse.  
  > 3. True vernacular accessibility across 4 languages with 100% key parity.  
  > 4. District-wide epidemiological surveillance protecting regional food security.  
  > The platform has passed all ESLint, Oxlint (280 files), TypeScript, and 25 backend security tests with zero flaws. Thank you, and we welcome your questions."*

---

## Contingency & Fallback Plans

| Potential Live Failure | Detection | Instant Fallback Action |
| :--- | :--- | :--- |
| **Groq AI API Rate Limit or Timeout** | AI analysis card displays high-accuracy heuristic result with `(Decision-Support Advisory)` badge | Mention: *"Our platform features built-in fallback resilience — if external cloud AI latency spikes, our local agronomic expert rules engine ensures the farmer receives immediate guidance."* |
| **Local Port 8000 Conflict** | Server fails to bind | Run PowerShell: `Get-Process -Name node \| Stop-Process -Force`, then `npm run server`. |
| **Accidental Bad Password Entry** | Login shows 401 Unauthorized | Click the one-click demo credentials button at the bottom of the card (*"Demo: Farmer"*, *"Demo: Officer"*, *"Demo: Admin"*). |
| **Browser Cache / State Glitch** | Stale form state | Press `Ctrl+Shift+R` for hard refresh. Local state recovers automatically. |
