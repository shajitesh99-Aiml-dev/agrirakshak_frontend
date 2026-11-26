"""
Generates an interactive HTML presentation preview matching docs/Agri_Rakshak_SIH_2026.pptx
"""

import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agri Rakshak — SIH 2026 Presentation Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: #0b1120; color: #f8fafc; }
    h1, h2, h3, .heading-font { font-family: 'Outfit', sans-serif; }
    .slide-card {
      aspect-ratio: 16 / 9;
      background: #0f172a;
      border: 1px solid #1e293b;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
  </style>
</head>
<body class="p-6 md:p-12 max-w-7xl mx-auto">
  <header class="mb-10 text-center">
    <div class="inline-block px-4 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold text-xs rounded-full uppercase tracking-widest mb-3">
      Smart India Hackathon 2026 • SIH26131
    </div>
    <h1 class="text-3xl md:text-5xl font-extrabold text-white">Agri Rakshak (कृषि रक्षक)</h1>
    <p class="text-slate-400 text-lg mt-2">Official 12-Slide Presentation Preview • PowerPoint file: <code class="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">docs/Agri_Rakshak_SIH_2026.pptx</code></p>
  </header>

  <div class="space-y-12">

    <!-- Slide 1 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between border-l-4 border-l-emerald-500">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 01 • Title & Overview</span>
        <h2 class="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)</h2>
        <p class="text-xl md:text-2xl text-slate-400 font-medium mt-2">AI-Assisted Crop Disease Detection, Surveillance & Human-in-the-Loop Advisory System</p>
        <p class="text-slate-300 mt-6 max-w-3xl leading-relaxed">
          Empowering Indian smallholder farmers with instant multimodal diagnostic decision-support, localized vernacular advisories (EN, TE, HI, KN), verified Agricultural Officer escalation, and district-level outbreak surveillance.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <p class="text-emerald-400 font-bold text-sm">AI Decision Support</p>
          <p class="text-slate-400 text-xs mt-1">Groq LLaMA 3.3 70B Vision Engine (<800ms)</p>
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <p class="text-emerald-400 font-bold text-sm">Human-in-the-Loop</p>
          <p class="text-slate-400 text-xs mt-1">Agronomist Validation & Certified Dosage</p>
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <p class="text-emerald-400 font-bold text-sm">Epidemic Surveillance</p>
          <p class="text-slate-400 text-xs mt-1">District Hotspots & Outbreak Heatmaps</p>
        </div>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 02 • Agricultural Challenges</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Problem Statement & Rural Bottlenecks</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">1. Delayed Pathology Diagnosis</h3>
          <p class="text-slate-300 text-sm mt-2">Farmers identify blights and insect infestations only after damage exceeds 30-40%, by which time yield loss is irreversible.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">2. Indiscriminate Chemical Overuse</h3>
          <p class="text-slate-300 text-sm mt-2">Guesswork leads to excessive applications of expensive synthetic pesticides, depleting soil biology and leaving harmful chemical residues.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">3. Agronomist Shortage & Rural Isolation</h3>
          <p class="text-slate-300 text-sm mt-2">With ~1 extension officer per 1,000+ farmers, physical field visits are severely constrained by geography and travel time.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">4. Vernacular & Telemetry Barriers</h3>
          <p class="text-slate-300 text-sm mt-2">Technical advisories are rarely published in vernacular dialects, preventing smallholder farmers speaking Telugu or Kannada from taking timely action.</p>
        </div>
      </div>
      <p class="text-xs text-slate-500">Agri Rakshak bridges this gap by marrying rapid AI triage with agronomist accountability.</p>
    </div>

    <!-- Slide 3 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 03 • Stakeholders</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Target Users & Distinct Value Propositions</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">Kisan (Farmer)</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">Primary Beneficiary</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• Photo upload + guided symptom tagging.</li>
            <li>• Instant AI diagnostic advisory.</li>
            <li>• Certified officer prescription dosage.</li>
            <li>• 100% natural vernacular interface.</li>
            <li>• Complete case timeline tracking.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">Agricultural Officer</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">KVK / Taluk Agronomist</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• Priority triage queue (Critical first).</li>
            <li>• Side-by-side view: Farmer photo vs AI.</li>
            <li>• Official prescription generator.</li>
            <li>• On-site field visit scheduler.</li>
            <li>• Immutable timeline audit trails.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">District Administrator</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">Epidemiological Director</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• Geospatial disease hotspot clusters.</li>
            <li>• Outbreak early warning system.</li>
            <li>• 7-day disease trend tracking.</li>
            <li>• Targeted agronomist mobilization.</li>
            <li>• Strict RBAC isolation enforcement.</li>
          </ul>
        </div>
      </div>
      <p class="text-xs text-slate-500">Separation of concerns enforced by cryptographic HMAC-SHA256 tokens.</p>
    </div>

    <!-- Slide 4 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 04 • Solution Architecture</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Human-in-the-Loop Triaged Workflow</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto">
        <div class="bg-slate-800/80 p-4 rounded-xl border-l-2 border-emerald-500">
          <p class="text-emerald-400 font-bold text-sm">Step 1: Report</p>
          <p class="text-slate-300 text-xs mt-2">Farmer files case via 4-step wizard with visual symptoms and canopy photo.</p>
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border-l-2 border-emerald-500">
          <p class="text-emerald-400 font-bold text-sm">Step 2: AI Diagnostic</p>
          <p class="text-slate-300 text-xs mt-2">Groq LLaMA 3.3 70B vision reasoning extracts label, confidence & severity.</p>
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border-l-2 border-emerald-500">
          <p class="text-emerald-400 font-bold text-sm">Step 3: Officer Triage</p>
          <p class="text-slate-300 text-xs mt-2">Critical cases auto-escalate; Agronomist validates and issues prescription.</p>
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border-l-2 border-emerald-500">
          <p class="text-emerald-400 font-bold text-sm">Step 4: Resolution</p>
          <p class="text-slate-300 text-xs mt-2">Farmer notified; timeline updated; admin surveillance captures hotspot cluster.</p>
        </div>
      </div>
      <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300">
        <strong class="text-emerald-400">Why Human-in-the-Loop is Critical:</strong> AI acts strictly as decision support, preventing autonomous chemical orders and eliminating model hallucinations through certified agronomist sign-off.
      </div>
    </div>

    <!-- Slide 5 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 05 • Technology Stack</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Modern Decoupled Full-Stack Architecture</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">Frontend Tier</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">React 19 & Tailwind CSS</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• React 19 Single Page App.</li>
            <li>• Tailwind CSS responsive design.</li>
            <li>• Lucide React + Recharts telemetry.</li>
            <li>• Custom 4-locale i18n engine.</li>
            <li>• Zero secret leakage in bundle.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">Backend API Tier</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">Native Node.js Server</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• Native Node HTTP engine.</li>
            <li>• PBKDF2 Password Hashing (100k).</li>
            <li>• HMAC-SHA256 Token Auth.</li>
            <li>• Multi-tier RBAC guards.</li>
            <li>• Sliding-window rate limiting.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg">Persistence & AI Tier</h3>
          <p class="text-amber-400 text-xs font-semibold uppercase mt-0.5">Prisma ORM & Groq Cloud</p>
          <ul class="text-slate-300 text-xs space-y-2 mt-4">
            <li>• Prisma ORM v6 with clean schema.</li>
            <li>• PostgreSQL 16 with FK cascades.</li>
            <li>• Atomic transactions (prisma.$transaction).</li>
            <li>• DATABASE_REQUIRED strict fail-safe.</li>
            <li>• Groq LLaMA 3.3 70B Vision (backend-only).</li>
          </ul>
        </div>
      </div>
      <p class="text-xs text-slate-500">Configured with Docker Compose orchestration and GitHub Actions CI.</p>
    </div>

    <!-- Slide 6 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 06 • Farmer Experience</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Crop Reporting & Case Lifecycle Tracking</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
        <div class="space-y-4">
          <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 class="text-emerald-400 font-bold text-sm">1. Crop & Growth Stage</h4>
            <p class="text-slate-300 text-xs mt-1">Select from major Indian crops (Tomato, Cotton, Rice, Wheat, Groundnut) and vegetative/flowering stage.</p>
          </div>
          <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 class="text-emerald-400 font-bold text-sm">2. Visual Symptoms</h4>
            <p class="text-slate-300 text-xs mt-1">Multi-select observed leaf conditions: dark concentric rings, chlorosis, honeydew, wilt, or stippling.</p>
          </div>
          <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 class="text-emerald-400 font-bold text-sm">3. Photo Evidence & Location</h4>
            <p class="text-slate-300 text-xs mt-1">High-resolution canopy upload with village and district geolocation telemetry.</p>
          </div>
          <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 class="text-emerald-400 font-bold text-sm">4. Explicit Consent & Submission</h4>
            <p class="text-slate-300 text-xs mt-1">Farmer explicitly consents to AI diagnostic assistance and officer triage before submission.</p>
          </div>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-center">
          <h4 class="text-white font-bold text-base mb-3">Live Case Tracking Timeline</h4>
          <div class="border-l-2 border-emerald-500 pl-4 space-y-4 text-xs">
            <div>
              <p class="text-emerald-400 font-semibold">Case Report Filed</p>
              <p class="text-slate-400">Ramesh Patel (Farmer) • Tomato (टमाटर)</p>
            </div>
            <div>
              <p class="text-emerald-400 font-semibold">AI Diagnostic Inferred</p>
              <p class="text-slate-400">Early Blight (Alternaria solani) • 92% Confidence</p>
            </div>
            <div>
              <p class="text-amber-400 font-semibold">Officer Advisory Recorded</p>
              <p class="text-slate-400">Dr. Priya Sharma approved copper oxychloride treatment</p>
            </div>
            <div>
              <p class="text-emerald-400 font-semibold">Field Visit Scheduled</p>
              <p class="text-slate-400">Plot 4B Rampur Village • Scheduled for 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-xs text-slate-500">Every state change generates real-time in-app notification alerts.</p>
    </div>

    <!-- Slide 7 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 07 • AI Decision Support</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Vision Reasoning & Safety Guardrails</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Groq LLaMA 3.3 70B Vision</h3>
          <p class="text-slate-300 text-sm mt-2">State-of-the-art hosted multimodal LLM executing low-latency image pathology analysis via server-side API.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Structured JSON Schema</h3>
          <p class="text-slate-300 text-sm mt-2">Inference strictly formatted into machine-readable JSON: label, scientificName, confidence, severity, and recommendations.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Strict Advisory Disclaimer</h3>
          <p class="text-slate-300 text-sm mt-2">Mandatory visual disclaimer: AI findings are decision-support advisories; chemical pesticides require officer approval.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Threshold Auto-Escalation</h3>
          <p class="text-slate-300 text-sm mt-2">Severe or high-risk pests (confidence > 85%, severity: high/critical) auto-escalate to the Officer Triage Queue.</p>
        </div>
      </div>
      <p class="text-xs text-slate-500">Resilient heuristic fallback automatically activates if cloud API is unreachable.</p>
    </div>

    <!-- Slide 8 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 08 • Officer Portal</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Agricultural Officer Triage & Certified Advisory</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-base">1. Priority Triage Queue</h3>
          <p class="text-slate-300 text-xs mt-3 leading-relaxed">
            Cases organized by urgency (Escalated, Critical, High, Moderate). Officers immediately spot spreading fungal or insect risks across their assigned district.
          </p>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-base">2. Side-by-Side Review</h3>
          <p class="text-slate-300 text-xs mt-3 leading-relaxed">
            Officer inspects farmer canopy photographs directly alongside AI vision diagnostic reasoning, confirming, modifying, or rejecting preliminary predictions.
          </p>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-base">3. Prescription & Visits</h3>
          <p class="text-slate-300 text-xs mt-3 leading-relaxed">
            Officers formulate dosage advisories (e.g., Copper Oxychloride 50% WP @ 2.5g/L) and schedule on-site farm inspections with date and plot details.
          </p>
        </div>
      </div>
      <p class="text-xs text-slate-500">Updates execute via atomic Prisma transactions for ACID reliability.</p>
    </div>

    <!-- Slide 9 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 09 • Surveillance & Languages</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Epidemic Surveillance & 4-Language Accessibility</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg mb-3">Epidemiological Surveillance</h3>
          <ul class="text-slate-300 text-xs space-y-3">
            <li>• <strong>Geospatial Hotspots:</strong> Live cluster telemetry aggregated by district, crop, and dominant pathogen.</li>
            <li>• <strong>Outbreak Alerts:</strong> Automated detection of spreading fungal spores (e.g. Early Blight in Varanasi).</li>
            <li>• <strong>Resource Allocation:</strong> State directorates assign field officers to containment zones before infestation spreads.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-lg mb-3">Four-Language Localization</h3>
          <ul class="text-slate-300 text-xs space-y-3">
            <li>• <strong>English (en):</strong> Administrative baseline (497 keys).</li>
            <li>• <strong>Telugu (తెలుగు):</strong> Vernacular translation for Andhra & Telangana farmers (100% key parity).</li>
            <li>• <strong>Hindi (हिन्दी):</strong> Devanagari translation for North/Central agrarian belts (100% key parity).</li>
            <li>• <strong>Kannada (ಕನ್ನಡ):</strong> Vernacular translation for Karnataka agricultural belts (100% key parity).</li>
          </ul>
        </div>
      </div>
      <p class="text-xs text-slate-500">Zero page reloads required when switching language preferences.</p>
    </div>

    <!-- Slide 10 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 10 • Security Architecture</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Security, Privacy & Zero Secret Exposure</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Zero Secret Leakage</h3>
          <p class="text-slate-300 text-sm mt-2">GROQ_API_KEY, AUTH_SECRET, and DATABASE_URL are strictly server-side. Production bundle verified: 0 secret patterns in client code.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Cryptographic Auth & RBAC</h3>
          <p class="text-slate-300 text-sm mt-2">PBKDF2-HMAC-SHA256 password hashing (100k rounds) with unique salt. HMAC signed bearer tokens enforce strict role boundaries.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Case Ownership Isolation</h3>
          <p class="text-slate-300 text-sm mt-2">Farmers can only query and view their own private case records. Cross-tenant queries are rejected with 403 Forbidden.</p>
        </div>
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60">
          <h3 class="text-emerald-400 font-bold text-lg">Defensive Headers & Rate Limiting</h3>
          <p class="text-slate-300 text-sm mt-2">HSTS, nosniff, Frame-Options: DENY, restrictive CSP, and in-memory rate limiting defense against brute force attacks.</p>
        </div>
      </div>
      <p class="text-xs text-slate-500">Verified through automated 25-scenario security test suite.</p>
    </div>

    <!-- Slide 11 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 11 • Test Evidence</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Implementation Status & Honest Verification</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-emerald-500/40">
          <h3 class="text-emerald-400 font-bold text-base mb-3">Verified & Passing Quality Gates</h3>
          <ul class="text-slate-300 text-xs space-y-2">
            <li>✓ <strong>ESLint Quality Gate:</strong> PASS (0 errors across workspace).</li>
            <li>✓ <strong>Oxlint Static Analysis:</strong> PASS (0 errors on 280 files).</li>
            <li>✓ <strong>TypeScript Strict Compiler:</strong> PASS (tsc -b passed with 0 errors).</li>
            <li>✓ <strong>Multilingual i18n Parity:</strong> PASS (497/497 keys across EN/TE/HI/KN).</li>
            <li>✓ <strong>Security Test Suite:</strong> PASS (25 Passed, 0 Failed).</li>
            <li>✓ <strong>Persistence Unit Suite:</strong> PASS (24 Passed, 0 Failed).</li>
            <li>✓ <strong>Database Fail-Safe Abort:</strong> PASS (DATABASE_REQUIRED aborts cleanly).</li>
            <li>✓ <strong>Production Vite Bundle:</strong> PASS (Compiled in 1.52s, 0 secret leaks).</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-amber-500/40">
          <h3 class="text-amber-400 font-bold text-base mb-3">Honest Operational Status Disclosures</h3>
          <ul class="text-slate-300 text-xs space-y-2">
            <li>⚠ <strong>Local PostgreSQL Runtime:</strong> BLOCKED on dev machine (host lacks native Docker & PostgreSQL service).</li>
            <li>⚠ <strong>Docker Compose Runtime:</strong> BLOCKED on host (Docker daemon absent). Configuration verified.</li>
            <li>✓ <strong>CI Ephemeral Database:</strong> Configured in .github/workflows/ci.yml with postgres:16-alpine service container.</li>
            <li>✓ <strong>AI Diagnostic Engine:</strong> Powered by Groq Cloud API with local heuristic fallback.</li>
            <li>✓ <strong>Zero False Claims:</strong> We do NOT claim custom model training or production field pilots that have not occurred.</li>
          </ul>
        </div>
      </div>
      <p class="text-xs text-slate-500">Full testing transparency adheres strictly to SIH evaluation integrity.</p>
    </div>

    <!-- Slide 12 -->
    <div class="slide-card rounded-2xl p-8 md:p-12 flex flex-col justify-between border-r-4 border-r-emerald-500">
      <div>
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Slide 12 • Future Scope & Impact</span>
        <h2 class="text-3xl font-extrabold text-white mt-2">Expected Impact & Future Roadmap</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-base mb-3">Anticipated Impact</h3>
          <ul class="text-slate-300 text-xs space-y-2.5">
            <li>• <strong>Crop Loss Prevention:</strong> Early triage stops fungal blights before irreversible yield collapse.</li>
            <li>• <strong>Pesticide Rationalization:</strong> Human officer verification stops indiscriminate chemical spraying.</li>
            <li>• <strong>10x Agronomist Multiplier:</strong> Extension officers supervise 10x more cases via automated triage.</li>
            <li>• <strong>Vernacular Digital Inclusion:</strong> Eliminates language barriers for rural Indian smallholders.</li>
          </ul>
        </div>
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
          <h3 class="text-emerald-400 font-bold text-base mb-3">Future Pilot Roadmap</h3>
          <ul class="text-slate-300 text-xs space-y-2.5">
            <li>• <strong>Edge Quantized AI:</strong> Deploy MobileNetV4 for zero-connectivity offline diagnosis.</li>
            <li>• <strong>KCC / DLT SMS Alerts:</strong> Deliver officer advisories via vernacular SMS and WhatsApp.</li>
            <li>• <strong>Satellite Microclimates:</strong> Correlate IMD humidity telemetry to predict spore germination.</li>
            <li>• <strong>KVK Pilot Trials:</strong> Formal village trials in partnership with agricultural universities.</li>
          </ul>
        </div>
      </div>
      <div class="flex justify-between items-center pt-4 border-t border-slate-800 text-xs text-slate-400">
        <span>Agri Rakshak • SIH26131</span>
        <span class="text-emerald-400 font-bold">Smart India Hackathon 2026</span>
      </div>
    </div>

  </div>

  <footer class="mt-12 text-center text-xs text-slate-500 pb-12">
    Agri Rakshak — Smart India Hackathon 2026 (SIH26131) • Editable presentation available at <code class="text-slate-400">docs/Agri_Rakshak_SIH_2026.pptx</code>
  </footer>
</body>
</html>
"""

def generate_html_preview():
    output_path = r"d:\Agri-Rakshak\docs\presentation-preview.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"[SUCCESS] HTML Presentation Preview generated at {output_path}")

if __name__ == "__main__":
    generate_html_preview()
