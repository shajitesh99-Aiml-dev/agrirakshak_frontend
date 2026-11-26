# Agri Rakshak — Architecture & Workflow Diagrams (Phase 15)

**Project:** Agri Rakshak (कृषि रक्षक)  
**SIH Problem Statement:** SIH26131  
**Directory:** `docs/diagrams/`  

This directory contains the editable architectural blueprints, workflow sequences, role-based boundary diagrams, and deployment topologies for Agri Rakshak.

---

## 1. High-Level System Architecture

Editable source: [`system-architecture.mmd`](./system-architecture.mmd)

```mermaid
graph TB
    subgraph ClientLayer ["Client Layer (Web & Mobile Browser)"]
        FarmerUI["Farmer Portal (React 19)<br/>• Multilingual (EN, TE, HI, KN)<br/>• Case Reporting Wizard<br/>• Advisory & Notification Feed"]
        OfficerUI["Officer Portal (React 19)<br/>• Triage Queue<br/>• Scientific Assessment & Advisory<br/>• Field Visit Scheduling"]
        AdminUI["Admin Portal (React 19)<br/>• Outbreak Heatmaps & Hotspots<br/>• Regional Epidemiological Trends<br/>• Telemetry & System Status"]
    end

    subgraph SecurityGate ["Security & Middleware Boundary"]
        SecHeaders["Security Headers (CSP, HSTS, X-Frame-Options)"]
        CorsGuard["CORS Origin Allowlist"]
        RateLimit["Sliding-Window Rate Limiting"]
        AuthRBAC["PBKDF2 Auth & HMAC-SHA256 Token Verification"]
    end

    subgraph BackendCore ["Agri Rakshak Backend (Node.js Port 8000)"]
        AuthRouter["Auth & Profile Routes"]
        CaseRouter["Case Management & Timeline Router"]
        NotifyRouter["Notification Dispatch Router"]
        AdminRouter["Surveillance & Analytics Router"]
        AIProxy["Groq AI Diagnostic Proxy<br/>(Confidential Server-Side Client)"]
    end

    subgraph AIDiagnostic ["External AI Provider (Server-to-Server Only)"]
        GroqCloud["Groq Cloud LLaMA 3.3 70B Versatile<br/>Vision Reasoning & Agronomic Formatting"]
    end

    subgraph DataLayer ["Persistence Layer (Dual-Mode Resilient Architecture)"]
        PrismaORM["Prisma ORM Client v6.19.3<br/>(Atomic Transactions & FK Cascades)"]
        PG_DB[("PostgreSQL 16 Database<br/>[PRODUCTION / STRICT MODE]<br/>(Docker / Native Daemon)<br/>*Local host test: BLOCKED*")]
        FallbackStore[("Standalone In-Memory Store<br/>[DEVELOPMENT FALLBACK]<br/>(Non-blocking Resilient Demo)")]
    end

    FarmerUI --> SecHeaders
    OfficerUI --> SecHeaders
    AdminUI --> SecHeaders

    SecHeaders --> CorsGuard --> RateLimit --> AuthRBAC

    AuthRBAC --> AuthRouter
    AuthRBAC --> CaseRouter
    AuthRBAC --> NotifyRouter
    AuthRBAC --> AdminRouter

    CaseRouter --> AIProxy
    AIProxy -->|"HTTPS JSON Payload (No Client Exposure)"| GroqCloud
    GroqCloud -->|"Diagnostic Advisory Inference"| AIProxy

    AuthRouter --> PrismaORM
    CaseRouter --> PrismaORM
    NotifyRouter --> PrismaORM
    AdminRouter --> PrismaORM

    PrismaORM -.->|"DATABASE_REQUIRED=true"| PG_DB
    PrismaORM -.->|"DATABASE_REQUIRED=false (Fallback)"| FallbackStore
```

---

## 2. Farmer-to-AI-to-Officer Workflow

Editable source: [`farmer-officer-workflow.mmd`](./farmer-officer-workflow.mmd)

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer (Kisan)
    participant UI as React 19 Frontend
    participant API as Node.js Backend API
    participant AI as Groq Vision AI Engine
    participant DB as Persistence Layer (Prisma)
    actor Officer as Agricultural Officer (Agronomist)

    %% Step 1: Farmer reports problem
    Farmer->>UI: Selects Crop, Symptoms, Uploads Photo & Enters Consent
    UI->>API: POST /api/v1/cases (Bearer Token)
    API->>DB: Save Case (Initial Status: Pending)
    API-->>UI: Case Created (CASE-2026-XXX)

    %% Step 2: AI Diagnostic Decision Support
    UI->>API: POST /api/v1/analyze/crop-case
    Note over API,AI: Confidential GROQ_API_KEY used strictly server-side
    API->>AI: Image & Symptom Telemetry Request
    AI-->>API: JSON: Prediction, Confidence, Severity, Recommendations, Escalation Flag
    API->>DB: Atomic Update: Case.aiAnalysis + CaseTimeline Event
    API-->>UI: Persisted Diagnostic Advisory Result

    alt High Severity or Critical Pest Threshold
        Note over API,DB: System auto-escalates case (Status: Escalated)
        API->>DB: Enqueue in Officer Triage Queue
    else Routine / Moderate Pathology
        Note over API: Queued for standard supervisory review
    end

    %% Step 3: Officer Triage & Review
    Officer->>UI: Log in & Inspect Triage Queue (/officer/cases)
    UI->>API: GET /api/v1/cases/queue
    API->>DB: Fetch Pending & Escalated Cases
    API-->>UI: Return Case Details with AI Diagnostics

    Officer->>UI: Scientific Review: Confirm/Modify Diagnosis + Prescribe Advisory
    opt On-site Validation Required
        Officer->>UI: Schedule Field Inspection Visit (Date, Plot Location)
    end
    UI->>API: POST /api/v1/cases/:id/review (Bearer Token)
    API->>DB: prisma.$transaction([Update Case, Create Review Timeline, Create Visit Timeline])
    API->>DB: Create Farmer Notification (Target: farmerId)
    API-->>UI: Review Acknowledged & Status Updated to Resolved / Under Review

    %% Step 4: Farmer Notification & Advisory Follow-up
    Farmer->>UI: Receives Real-time Notification Banner
    UI->>API: GET /api/v1/notifications
    API-->>UI: "Dr. Priya Sharma issued verified advisory for Case #CASE-2026-XXX"
    Farmer->>UI: Views Detailed Case Timeline & Prescription Advisory (Telugu/Hindi/English/Kannada)
```

---

## 3. Role-Based Access Control & API Interaction

Editable source: [`rbac-api-interaction.mmd`](./rbac-api-interaction.mmd)

```mermaid
graph TD
    subgraph Users ["Actors & Client Roles"]
        U_Farmer["Farmer<br/>(kisan@agrirakshak.in)"]
        U_Officer["Agricultural Officer<br/>(officer@agrirakshak.in)"]
        U_Admin["State/District Admin<br/>(admin@agrirakshak.in)"]
    end

    subgraph AuthLayer ["Authentication & Token Verification"]
        LoginEndpoint["POST /api/v1/auth/login<br/>(PBKDF2 Password Verification)"]
        TokenGen["HMAC-SHA256 Token Generator<br/>(Embeds: id, role, phone)"]
        AuthMiddleware["authenticateRequest()<br/>(Validates Signature & Expiration)"]
        RoleMiddleware["requireRole(allowedRoles)<br/>(Strict Role Boundary Enforcement)"]
    end

    subgraph FarmerEndpoints ["Farmer API Scope (Role: 'farmer' or 'admin')"]
        EP_FarmerDash["GET /api/v1/dashboard/farmer"]
        EP_FarmerCases["GET /api/v1/cases (Filtered by farmerId)"]
        EP_CreateCase["POST /api/v1/cases (Ownership Assigned)"]
        EP_AnalyzeCase["POST /api/v1/analyze/crop-case"]
        EP_Notifications["GET /api/v1/notifications (Targeted to farmerId/all)"]
    end

    subgraph OfficerEndpoints ["Officer API Scope (Role: 'officer' or 'admin')"]
        EP_OfficerDash["GET /api/v1/dashboard/officer"]
        EP_OfficerQueue["GET /api/v1/cases/queue (District Scope)"]
        EP_SubmitReview["POST /api/v1/cases/:id/review"]
        EP_UpdateStatus["PATCH /api/v1/cases/:id/status"]
    end

    subgraph AdminEndpoints ["Admin API Scope (Role: 'admin' ONLY)"]
        EP_AdminDash["GET /api/v1/dashboard/admin"]
        EP_Surveillance["GET /api/v1/surveillance/outbreaks"]
        EP_Hotspots["GET /api/v1/surveillance/hotspots"]
        EP_UserMgmt["GET /api/v1/admin/users"]
    end

    U_Farmer --> LoginEndpoint
    U_Officer --> LoginEndpoint
    U_Admin --> LoginEndpoint

    LoginEndpoint --> TokenGen --> AuthMiddleware --> RoleMiddleware

    RoleMiddleware -->|"Allowed: farmer, admin"| EP_FarmerDash
    RoleMiddleware -->|"Allowed: farmer, admin"| EP_FarmerCases
    RoleMiddleware -->|"Allowed: farmer, admin"| EP_CreateCase
    RoleMiddleware -->|"Allowed: farmer, admin"| EP_AnalyzeCase
    RoleMiddleware -->|"Allowed: farmer, admin"| EP_Notifications

    RoleMiddleware -->|"Allowed: officer, admin"| EP_OfficerDash
    RoleMiddleware -->|"Allowed: officer, admin"| EP_OfficerQueue
    RoleMiddleware -->|"Allowed: officer, admin"| EP_SubmitReview
    RoleMiddleware -->|"Allowed: officer, admin"| EP_UpdateStatus

    RoleMiddleware -->|"Allowed: admin ONLY"| EP_AdminDash
    RoleMiddleware -->|"Allowed: admin ONLY"| EP_Surveillance
    RoleMiddleware -->|"Allowed: admin ONLY"| EP_Hotspots
    RoleMiddleware -->|"Allowed: admin ONLY"| EP_UserMgmt

    RoleMiddleware -.->|"Farmer accesses Officer/Admin routes"| Block403["403 Forbidden Response"]
    RoleMiddleware -.->|"Officer accesses Admin surveillance"| Block403
    RoleMiddleware -.->|"Unauthenticated Request"| Block401["401 Unauthorized Response"]
```

---

## 4. Deployment Topology & Verification Status

Editable source: [`deployment-topology.mmd`](./deployment-topology.mmd)

```mermaid
graph TB
    subgraph ClientDevice ["Client Tier (Browser Client)"]
        Browser["User Browser (Desktop / Mobile 375px+)<br/>Executes React 19 SPA Code<br/>Base URL: http://localhost:8000/api/v1<br/>*Never resolves internal Docker hostnames*"]
    end

    subgraph HostDeployment ["Host Deployment Environment"]
        subgraph VerifiedLocal ["Phase 14 Verified Bare-Metal Mode (Active Demonstration)"]
            ViteDev["Vite Development Server (Port 5173)<br/>[VERIFIED & RUNNING]"]
            NodeAPI["Node.js Native Server (Port 8000)<br/>[VERIFIED & RUNNING]<br/>• Resilient Standalone Memory Store<br/>• Strictly Guarded Database Required Mode"]
        end

        subgraph ContainerizedTopology ["Docker Compose Production Topology (Configuration Validated)"]
            NginxContainer["frontend container (Port 80)<br/>Hardened Nginx Alpine<br/>*Host Runtime Status: BLOCKED (No local Docker)*"]
            BackendContainer["backend container (Port 8000)<br/>Unprivileged user: node<br/>*Host Runtime Status: BLOCKED (No local Docker)*"]
            PostgresContainer[("db container (Port 5432)<br/>PostgreSQL 16 Alpine + pgdata volume<br/>*Host Runtime Status: BLOCKED (No local Docker)*")]
        end
    end

    subgraph ExternalServices ["External Cloud Services (Server-Side Only)"]
        GroqAPI["Groq Cloud AI (api.groq.com)<br/>Model: llama-3.3-70b-versatile<br/>[VERIFIED & OPERATIONAL VIA BACKEND]"]
    end

    subgraph CIEnvironment ["GitHub Actions CI Environment (Remote Ubuntu Runner)"]
      CIRunner["GitHub Actions Runner<br/>• Node 20.x / 22.x matrix<br/>• Ephemeral PostgreSQL 16 Service Container<br/>• Runs test:db-lifecycle with DATABASE_REQUIRED=true<br/>*Remote Execution Status: PENDING REPO DISPATCH*"]
    end

    Browser -->|"HTTP / REST API (Port 8000)"| NodeAPI
    Browser -.->|"Production Port 80 (When Containerized)"| NginxContainer

    NginxContainer -.->|"Internal Network (agri-rakshak-net)"| BackendContainer
    BackendContainer -.->|"Internal Network (db:5432)"| PostgresContainer

    NodeAPI -->|"HTTPS (Server-Side Bearer Token)"| GroqAPI
    BackendContainer -.->|"HTTPS (Server-Side Bearer Token)"| GroqAPI

    style PostgresContainer stroke:#f59e0b,stroke-width:2px,stroke-dasharray: 5 5
    style NginxContainer stroke:#f59e0b,stroke-width:2px,stroke-dasharray: 5 5
    style BackendContainer stroke:#f59e0b,stroke-width:2px,stroke-dasharray: 5 5
    style CIRunner stroke:#3b82f6,stroke-width:2px,stroke-dasharray: 5 5
    style NodeAPI stroke:#10b981,stroke-width:2px
    style ViteDev stroke:#10b981,stroke-width:2px
```

> **Verification Status Transparency:**  
> - **Verified & Operational:** Vite Development Server (`http://localhost:5173`), Native Node.js HTTP Server (`http://localhost:8000`), Groq AI vision engine proxy, Standalone fallback store, strict mode abort logic.  
> - **Configuration Validated / Host Runtime BLOCKED:** Docker Compose orchestration, PostgreSQL 16 live daemon on local Windows host (no Docker/PostgreSQL installed on development host).  
> - **CI Configured / Remote Execution Pending:** GitHub Actions Ubuntu runner with ephemeral PostgreSQL 16 Alpine container (`.github/workflows/ci.yml`).
