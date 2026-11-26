"""
Agri Rakshak - SIH 2026 PowerPoint Presentation Generator
Creates docs/Agri_Rakshak_SIH_2026.pptx with 12 professional slides.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

ARTIFACT_DIR = r"C:\Users\SHAJITESH\.gemini\antigravity-ide\brain\cc03b376-1148-4a31-8054-0d6593bfc291"
OUTPUT_PPTX = r"d:\Agri-Rakshak\docs\Agri_Rakshak_SIH_2026.pptx"

# Color Palette: Emerald Dark Theme & Agronomic Accents
COLOR_DARK_BG = RGBColor(15, 23, 42)       # Slate 900
COLOR_CARD_BG = RGBColor(30, 41, 59)       # Slate 800
COLOR_EMERALD = RGBColor(16, 185, 129)     # Emerald 500
COLOR_LIGHT_GREEN = RGBColor(52, 211, 153) # Emerald 400
COLOR_WHITE = RGBColor(255, 255, 255)
COLOR_MUTED = RGBColor(148, 163, 184)      # Slate 400
COLOR_AMBER = RGBColor(245, 158, 11)       # Amber 500

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen standard
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def add_header(slide, title, category="SMART INDIA HACKATHON 2026 • SIH26131"):
        # Category Eyebrow
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(0.4))
        tf = tx_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = category.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_LIGHT_GREEN

        # Main Slide Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.8))
        tf_t = tx_title.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_DARK_BG
        bg.line.fill.background()
        return bg

    def add_card(slide, left, top, width, height, title="", border_color=None):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD_BG
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.5)
        else:
            card.line.fill.background()

        if title:
            tb = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), width - Inches(0.5), Inches(0.5))
            tf = tb.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = title
            p.font.size = Pt(15)
            p.font.bold = True
            p.font.color.rgb = COLOR_LIGHT_GREEN
        return card

    # =========================================================================
    # SLIDE 1: Title & Overview
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_background(s1)

    # Accent decorative banner
    accent = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(0.15), Inches(3.8))
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_EMERALD
    accent.line.fill.background()

    tb = s1.shapes.add_textbox(Inches(1.2), Inches(1.4), Inches(11.0), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "SMART INDIA HACKATHON 2026 • PROBLEM STATEMENT SIH26131"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_LIGHT_GREEN

    p1 = tf.add_paragraph()
    p1.text = "Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)"
    p1.font.size = Pt(36)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.space_before = Pt(10)

    p2 = tf.add_paragraph()
    p2.text = "AI-Assisted Crop Disease Detection, Surveillance & Human-in-the-Loop Advisory System"
    p2.font.size = Pt(20)
    p2.font.color.rgb = COLOR_MUTED
    p2.space_before = Pt(8)

    p3 = tf.add_paragraph()
    p3.text = "Empowering Indian smallholder farmers with instant multimodal diagnostic decision-support, localized vernaculer advisories (EN, TE, HI, KN), verified Agricultural Officer escalation, and district-level outbreak surveillance."
    p3.font.size = Pt(13)
    p3.font.color.rgb = COLOR_WHITE
    p3.space_before = Pt(20)

    # Footnote badges
    b1 = add_card(s1, Inches(1.2), Inches(5.6), Inches(3.2), Inches(1.1))
    t1 = s1.shapes.add_textbox(Inches(1.3), Inches(5.7), Inches(3.0), Inches(0.9)).text_frame
    t1.paragraphs[0].text = "AI Decision Support"
    t1.paragraphs[0].font.bold = True
    t1.paragraphs[0].font.size = Pt(12)
    t1.paragraphs[0].font.color.rgb = COLOR_LIGHT_GREEN
    t1.add_paragraph().text = "Groq LLaMA 3.3 70B Vision Engine"
    t1.paragraphs[1].font.size = Pt(10)
    t1.paragraphs[1].font.color.rgb = COLOR_MUTED

    b2 = add_card(s1, Inches(4.7), Inches(5.6), Inches(3.2), Inches(1.1))
    t2 = s1.shapes.add_textbox(Inches(4.8), Inches(5.7), Inches(3.0), Inches(0.9)).text_frame
    t2.paragraphs[0].text = "Human-in-the-Loop"
    t2.paragraphs[0].font.bold = True
    t2.paragraphs[0].font.size = Pt(12)
    t2.paragraphs[0].font.color.rgb = COLOR_LIGHT_GREEN
    t2.add_paragraph().text = "Officer Validation & Prescriptions"
    t2.paragraphs[1].font.size = Pt(10)
    t2.paragraphs[1].font.color.rgb = COLOR_MUTED

    b3 = add_card(s1, Inches(8.2), Inches(5.6), Inches(3.2), Inches(1.1))
    t3 = s1.shapes.add_textbox(Inches(8.3), Inches(5.7), Inches(3.0), Inches(0.9)).text_frame
    t3.paragraphs[0].text = "Epidemic Surveillance"
    t3.paragraphs[0].font.bold = True
    t3.paragraphs[0].font.size = Pt(12)
    t3.paragraphs[0].font.color.rgb = COLOR_LIGHT_GREEN
    t3.add_paragraph().text = "District Hotspots & Outbreak Alerts"
    t3.paragraphs[1].font.size = Pt(10)
    t3.paragraphs[1].font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 2: Problem Statement & Agricultural Challenges
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_background(s2)
    add_header(s2, "Problem Statement & Rural Agricultural Bottlenecks")

    cards_data_s2 = [
        ("Delayed Pathology Diagnosis", "Farmers often identify fungal infections, viral blights, or pest infestations only after visual damage exceeds 30-40%. By this stage, crop loss is severe and irreversible.", Inches(0.8), Inches(1.8)),
        ("Indiscriminate Chemical Overuse", "Lacking timely scientific advisory, farmers rely on guesswork or local agro-dealer recommendations, frequently over-applying expensive, hazardous synthetic pesticides that deplete soil microbiome.", Inches(6.8), Inches(1.8)),
        ("Agronomist Shortage & Rural Isolation", "India faces a significant ratio gap of Agricultural Extension Officers to farmers (often 1 officer per 1,000+ farmers). Physical field visits are heavily constrained by geography and travel time.", Inches(0.8), Inches(4.3)),
        ("Language & Telemetry Barriers", "Agricultural advisories are overwhelmingly published in English or formal Hindi, preventing smallholder farmers speaking regional dialects (Telugu, Kannada) from taking actionable steps.", Inches(6.8), Inches(4.3)),
    ]

    for title, desc, left, top in cards_data_s2:
        add_card(s2, left, top, Inches(5.7), Inches(2.2), title)
        tb = s2.shapes.add_textbox(left + Inches(0.3), top + Inches(0.7), Inches(5.1), Inches(1.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 3: Target Users & Three-Tier Role Architecture
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_background(s3)
    add_header(s3, "Target Stakeholders & Distinct Value Propositions")

    users = [
        ("Kisan (Farmer)", "Primary Beneficiary", [
            "Easy photo upload + symptom selection wizard.",
            "Instant AI decision-support with confidence scores.",
            "Official officer advisory and field visit scheduling.",
            "100% natural vernacular UI in 4 Indian languages.",
            "Complete case history and notification tracking."
        ], Inches(0.8)),
        ("Agricultural Officer", "KVK / Taluk Agronomist", [
            "Prioritized triage queue (Critical/Escalated first).",
            "Side-by-side view: Farmer photos vs. AI diagnosis.",
            "Official prescription advisory & dosage generator.",
            "On-site field inspection scheduling with date & plot.",
            "Full timeline audit trail with immutable timestamps."
        ], Inches(4.8)),
        ("State / District Admin", "Policy & Surveillance", [
            "Regional epidemiological hotspot clusters.",
            "Early outbreak warning alerts (e.g. Pink Bollworm).",
            "Disease trend charts (7-day / 30-day moving averages).",
            "Resource allocation: Assign officers to active clusters.",
            "Secure audit logs and RBAC enforcement."
        ], Inches(8.8)),
    ]

    for role, subtitle, points, left in users:
        add_card(s3, left, Inches(1.8), Inches(3.7), Inches(5.1), role)
        tb = s3.shapes.add_textbox(left + Inches(0.25), Inches(2.4), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_sub = tf.paragraphs[0]
        p_sub.text = subtitle.upper()
        p_sub.font.size = Pt(10)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_AMBER

        for pt in points:
            p = tf.add_paragraph()
            p.text = f"• {pt}"
            p.font.size = Pt(11)
            p.font.color.rgb = COLOR_MUTED
            p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 4: Proposed Solution & End-to-End Workflow
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_background(s4)
    add_header(s4, "Proposed Solution: Human-in-the-Loop Triaged Workflow")

    workflow_steps = [
        ("Step 1: Crop Report", "Farmer files crop report via guided 4-step wizard with visual symptoms & photo.", Inches(0.8)),
        ("Step 2: AI Diagnostic", "Server-side Groq LLaMA 3.3 70B vision model analyzes pathology within seconds.", Inches(3.8)),
        ("Step 3: Officer Triage", "Critical cases auto-escalate; Agronomist reviews, validates, and prescribes advisory.", Inches(6.8)),
        ("Step 4: Resolution", "Farmer receives notification; timeline updates; admin surveillance captures cluster.", Inches(9.8)),
    ]

    for title, desc, left in workflow_steps:
        add_card(s4, left, Inches(1.8), Inches(2.7), Inches(2.2), title, border_color=COLOR_EMERALD)
        tb = s4.shapes.add_textbox(left + Inches(0.2), Inches(2.5), Inches(2.3), Inches(1.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_MUTED

    # Bottom summary card
    add_card(s4, Inches(0.8), Inches(4.3), Inches(11.7), Inches(2.6), "Why Human-in-the-Loop is Essential for Agriculture")
    tb_b = s4.shapes.add_textbox(Inches(1.1), Inches(4.9), Inches(11.1), Inches(1.8))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p_b1 = tf_b.paragraphs[0]
    p_b1.text = "• AI Decision-Support, NOT Replacement: AI provides immediate preliminary triage so farmers know if an issue is dangerous, but never issues final chemical pesticide orders without expert oversight."
    p_b1.font.size = Pt(12)
    p_b1.font.color.rgb = COLOR_WHITE

    p_b2 = tf_b.add_paragraph()
    p_b2.text = "• Safeguard Against Hallucination: Agricultural officers verify AI findings against regional climate conditions, ensuring erroneous recommendations never reach the field."
    p_b2.font.size = Pt(12)
    p_b2.font.color.rgb = COLOR_MUTED
    p_b2.space_before = Pt(8)

    p_b3 = tf_b.add_paragraph()
    p_b3.text = "• Continuous Feedback Loop: Officer confirmations and corrections create clean historical telemetry for future model refinement and district epidemiology."
    p_b3.font.size = Pt(12)
    p_b3.font.color.rgb = COLOR_MUTED
    p_b3.space_before = Pt(8)

    # =========================================================================
    # SLIDE 5: System Architecture & Technology Stack
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_background(s5)
    add_header(s5, "Full-Stack System Architecture & Technology Stack")

    tech_cols = [
        ("Frontend Tier", "React 19 & Tailwind CSS", [
            "React 19 SPA with Vite bundler.",
            "Tailwind CSS with responsive design system.",
            "Lucide React icon system + Recharts.",
            "Custom 4-locale i18n engine (EN/TE/HI/KN).",
            "Zero secret leakage (no API keys in bundle)."
        ], Inches(0.8)),
        ("Backend API Tier", "Native Node.js Server", [
            "Native HTTP engine (lightweight & secure).",
            "PBKDF2 Password Hashing (100k rounds).",
            "HMAC-SHA256 Token Authentication.",
            "Strict Role-Based Access Control (RBAC).",
            "Sliding-window rate limiting & CSP headers."
        ], Inches(4.8)),
        ("Persistence & AI Tier", "Prisma ORM & Groq Cloud", [
            "Prisma ORM v6 with clean schema models.",
            "PostgreSQL 16 with foreign key cascades.",
            "Atomic transactions (`prisma.$transaction`).",
            "DATABASE_REQUIRED strict fail-safe mode.",
            "Groq LLaMA 3.3 70B Vision (server-side only)."
        ], Inches(8.8)),
    ]

    for title, sub, points, left in tech_cols:
        add_card(s5, left, Inches(1.8), Inches(3.7), Inches(5.1), title)
        tb = s5.shapes.add_textbox(left + Inches(0.25), Inches(2.4), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_sub = tf.paragraphs[0]
        p_sub.text = sub.upper()
        p_sub.font.size = Pt(10)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_AMBER

        for pt in points:
            p = tf.add_paragraph()
            p.text = f"• {pt}"
            p.font.size = Pt(11)
            p.font.color.rgb = COLOR_MUTED
            p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 6: Farmer Experience & Crop Reporting Workflow
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_background(s6)
    add_header(s6, "Farmer Experience: Crop Reporting & Case Tracking")

    # Left content box
    add_card(s6, Inches(0.8), Inches(1.8), Inches(6.0), Inches(5.1), "Guided 4-Step Crop Problem Wizard")
    tb_s6 = s6.shapes.add_textbox(Inches(1.05), Inches(2.4), Inches(5.5), Inches(4.3))
    tf_s6 = tb_s6.text_frame
    tf_s6.word_wrap = True

    f_steps = [
        ("1. Crop & Growth Stage", "Select from major Indian crops (Tomato, Cotton, Rice, Wheat, Groundnut) and growth cycle stage."),
        ("2. Visual Symptoms", "Tag observable conditions: concentric rings, chlorosis, honeydew, wilt, stippling, or leaf curl."),
        ("3. Photo Evidence & Location", "Upload high-res canopy/leaf photo with village/district location telemetry."),
        ("4. Consent & Submit", "Explicit privacy consent acknowledgment prior to running AI diagnostic analysis."),
        ("Live Case Dashboard", "Inspect real-time status badges (Pending, Analyzing, Escalated, Under Review, Resolved) and historical timeline.")
    ]
    for i, (heading, desc) in enumerate(f_steps):
        p_h = tf_s6.paragraphs[0] if i == 0 else tf_s6.add_paragraph()
        p_h.text = f"• {heading}: "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = COLOR_LIGHT_GREEN
        if i > 0: p_h.space_before = Pt(6)

        p_d = tf_s6.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = COLOR_MUTED

    # Right side: Screenshot if available
    img_farmer = os.path.join(ARTIFACT_DIR, "farmer_dashboard_1792229517423.png")
    if os.path.exists(img_farmer):
        s6.shapes.add_picture(img_farmer, Inches(7.1), Inches(1.8), Inches(5.4), Inches(5.1))
    else:
        add_card(s6, Inches(7.1), Inches(1.8), Inches(5.4), Inches(5.1), "Farmer Dashboard Preview")

    # =========================================================================
    # SLIDE 7: AI Decision-Support Workflow & Safety Safeguards
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_background(s7)
    add_header(s7, "AI Decision Support: Vision Inference & Safety Guardrails")

    ai_cards = [
        ("Groq LLaMA 3.3 70B Vision", "State-of-the-art hosted multimodal LLM executing low-latency image pathology analysis via server-side API.", Inches(0.8), Inches(1.8)),
        ("Structured JSON Schema", "Inference strictly formatted into machine-readable JSON: label, scientificName, confidence, severity, and recommendations.", Inches(6.8), Inches(1.8)),
        ("Strict Advisory Notice", "Mandatory visual disclaimer: AI findings are decision-support advisories; chemical pesticides require officer approval.", Inches(0.8), Inches(4.3)),
        ("Threshold Auto-Escalation", "Severe or high-risk pests (confidence > 85%, severity: high/critical) auto-escalate to the Officer Triage Queue.", Inches(6.8), Inches(4.3)),
    ]

    for title, desc, left, top in ai_cards:
        add_card(s7, left, top, Inches(5.7), Inches(2.2), title)
        tb = s7.shapes.add_textbox(left + Inches(0.3), top + Inches(0.7), Inches(5.1), Inches(1.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 8: Agricultural Officer Workflow & Advisory
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_background(s8)
    add_header(s8, "Agricultural Officer Portal: Expert Review & Field Visits")

    add_card(s8, Inches(0.8), Inches(1.8), Inches(6.0), Inches(5.1), "Expert Validation & Prescription Workflow")
    tb_s8 = s8.shapes.add_textbox(Inches(1.05), Inches(2.4), Inches(5.5), Inches(4.3))
    tf_s8 = tb_s8.text_frame
    tf_s8.word_wrap = True

    o_steps = [
        ("Prioritized Queue", "Cases sorted by urgency (Escalated, Critical, High, Pending Review) for district jurisdiction."),
        ("Side-by-Side Review", "Officer inspects farmer-submitted photographs alongside AI diagnostic findings."),
        ("Scientific Advisory", "Officer selects validation outcome (Confirmed AI / Modified / Inconclusive) and types specific chemical/bio dosage."),
        ("Field Inspection Scheduling", "Option to schedule on-site visit with exact date and farmer plot location."),
        ("Timeline & Audit Trail", "All submissions atomically appended to CaseTimeline with officer name, role, and timestamp.")
    ]
    for i, (heading, desc) in enumerate(o_steps):
        p_h = tf_s8.paragraphs[0] if i == 0 else tf_s8.add_paragraph()
        p_h.text = f"• {heading}: "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = COLOR_LIGHT_GREEN
        if i > 0: p_h.space_before = Pt(6)

        p_d = tf_s8.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = COLOR_MUTED

    img_officer = os.path.join(ARTIFACT_DIR, "officer_dashboard_1792221520537.png")
    if os.path.exists(img_officer):
        s8.shapes.add_picture(img_officer, Inches(7.1), Inches(1.8), Inches(5.4), Inches(5.1))
    else:
        add_card(s8, Inches(7.1), Inches(1.8), Inches(5.4), Inches(5.1), "Officer Portal Preview")

    # =========================================================================
    # SLIDE 9: Admin Surveillance & 4-Language Multilingualism
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_background(s9)
    add_header(s9, "Admin Outbreak Surveillance & Multilingual Accessibility")

    add_card(s9, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.1), "Outbreak Surveillance & Epidemiological Heatmaps")
    tb_s9a = s9.shapes.add_textbox(Inches(1.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s9a = tb_s9a.text_frame
    tf_s9a.word_wrap = True

    surv_pts = [
        "Geospatial Hotspot Clusters: Live aggregation of cases by district, severity, and dominant pathogen.",
        "Regional Outbreak Alerts: Automated detection of fungal spore spread (e.g. Early Blight in Varanasi/Nashik).",
        "Actionable Resource Mobilization: Assign state agronomists directly to containment zones before infestation spreads.",
        "Moving Average Trends: 7-day disease velocity tracking for state agricultural directorates."
    ]
    for pt in surv_pts:
        p = tf_s9a.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_MUTED
        p.space_before = Pt(8)

    add_card(s9, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1), "Four-Language Localization (100% Key Parity)")
    tb_s9b = s9.shapes.add_textbox(Inches(7.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s9b = tb_s9b.text_frame
    tf_s9b.word_wrap = True

    lang_pts = [
        "English (en): Technical reference and administrative baseline (497 keys).",
        "Telugu (తెలుగు): Natural vernacular translation for Andhra Pradesh & Telangana farmers (497 keys, 100% parity).",
        "Hindi (हिन्दी): Devanagari translation for North & Central Indian agrarian belts (497 keys, 100% parity).",
        "Kannada (ಕನ್ನಡ): Vernacular translation for Karnataka agricultural zones (497 keys, 100% parity).",
        "Zero Reload Switching: Language switches seamlessly in-memory with preserved form and dashboard state."
    ]
    for pt in lang_pts:
        p = tf_s9b.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_MUTED
        p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 10: Security, Privacy & API Defense Safeguards
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_background(s10)
    add_header(s10, "Security, Privacy & Zero Secret Leakage Architecture")

    sec_cards = [
        ("Zero Secret Leakage", "GROQ_API_KEY, AUTH_SECRET, and DATABASE_URL are strictly server-side. Production bundle verified: 0 secret patterns in client code.", Inches(0.8), Inches(1.8)),
        ("Cryptographic Auth & RBAC", "PBKDF2-HMAC-SHA256 password hashing (100k rounds) with unique salt. HMAC signed bearer tokens enforce strict role boundaries.", Inches(6.8), Inches(1.8)),
        ("Case Ownership Isolation", "Farmers can only query and view their own private case records. Cross-tenant queries are rejected with 403 Forbidden.", Inches(0.8), Inches(4.3)),
        ("Defensive Headers & Rate Limiting", "HSTS, X-Content-Type-Options: nosniff, Frame-Options: DENY, restrictive CSP, and in-memory rate limiting defense.", Inches(6.8), Inches(4.3)),
    ]

    for title, desc, left, top in sec_cards:
        add_card(s10, left, top, Inches(5.7), Inches(2.2), title)
        tb = s10.shapes.add_textbox(left + Inches(0.3), top + Inches(0.7), Inches(5.1), Inches(1.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 11: Implementation Status & Honest Verification
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_background(s11)
    add_header(s11, "Implementation Status & Transparent Test Evidence")

    add_card(s11, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.1), "Verified & Passing Gates (Zero Flaws)")
    tb_s11a = s11.shapes.add_textbox(Inches(1.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s11a = tb_s11a.text_frame
    tf_s11a.word_wrap = True

    pass_pts = [
        "ESLint Code Quality Gate: PASS (0 errors across workspace).",
        "Oxlint High-Speed Linter: PASS (0 errors, 0 warnings on 280 files).",
        "TypeScript Strict Compiler: PASS (tsc -b passed with 0 type errors).",
        "Multilingual i18n Parity: PASS (497/497 keys across EN, TE, HI, KN).",
        "Security Regression Suite: PASS (25 Passed, 0 Failed).",
        "Persistence Unit Suite: PASS (24 Passed, 0 Failed).",
        "Database Fail-Safe Abort: PASS (DATABASE_REQUIRED aborts cleanly).",
        "Production Vite Bundle: PASS (Compiled in 1.52s with 0 secret leaks)."
    ]
    for pt in pass_pts:
        p = tf_s11a.add_paragraph()
        p.text = f"✓ {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_LIGHT_GREEN
        p.space_before = Pt(6)

    add_card(s11, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1), "Honest Limitations & Pending Deployments")
    tb_s11b = s11.shapes.add_textbox(Inches(7.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s11b = tb_s11b.text_frame
    tf_s11b.word_wrap = True

    lim_pts = [
        "Local PostgreSQL Runtime: BLOCKED on dev machine (neither Docker nor PostgreSQL daemon is installed locally).",
        "Docker Compose Runtime: BLOCKED on host (Docker daemon absent). Configurations statically verified.",
        "CI Ephemeral Database: Fully configured in .github/workflows/ci.yml with postgres:16-alpine service container.",
        "AI Diagnostic Provider: Powered by Groq Cloud API; requires active internet or uses resilient agronomic heuristic fallback.",
        "No Fabricated Claims: We do NOT claim custom model training or production field pilots that have not occurred."
    ]
    for pt in lim_pts:
        p = tf_s11b.add_paragraph()
        p.text = f"⚠ {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_AMBER
        p.space_before = Pt(6)

    # =========================================================================
    # SLIDE 12: Expected Impact, Future Scope & Closing
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_background(s12)
    add_header(s12, "Expected Impact, Future Roadmap & Conclusion")

    add_card(s12, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.1), "Anticipated Social & Agronomic Impact")
    tb_s12a = s12.shapes.add_textbox(Inches(1.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s12a = tb_s12a.text_frame
    tf_s12a.word_wrap = True

    impact_pts = [
        "Crop Loss Reduction: Early diagnosis allows biological and targeted interventions before irreversible yield damage occurs.",
        "Pesticide Rationalization: Human-in-the-loop validation curbs indiscriminate chemical application, protecting soil and health.",
        "Bridging Agronomist Shortages: One officer can supervise 10x more cases through pre-triaged AI diagnostic queues.",
        "Vernacular Digital Inclusion: Eliminates language barriers for rural Indian smallholders speaking Telugu, Hindi, or Kannada."
    ]
    for pt in impact_pts:
        p = tf_s12a.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_MUTED
        p.space_before = Pt(8)

    add_card(s12, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1), "Future Field-Pilot Roadmap (SIH26131)")
    tb_s12b = s12.shapes.add_textbox(Inches(7.05), Inches(2.4), Inches(5.2), Inches(4.3))
    tf_s12b = tb_s12b.text_frame
    tf_s12b.word_wrap = True

    road_pts = [
        "Edge-Device AI Models: Deploy lightweight quantized vision models (MobileNetV4) for zero-connectivity offline diagnosis.",
        "Kisan Call Center / SMS Integration: Push verified officer advisories via vernacular SMS (DLT gateway) & WhatsApp.",
        "Satellite Weather Telemetry: Ingest microclimate humidity data from IMD/ICAR to predict fungal spore germination risks.",
        "Field-Pilot Validation: Partner with district Krishi Vigyan Kendras (KVKs) for real-world farmer trials."
    ]
    for pt in road_pts:
        p = tf_s12b.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_MUTED
        p.space_before = Pt(8)

    # Save presentation
    os.makedirs(os.path.dirname(OUTPUT_PPTX), exist_ok=True)
    prs.save(OUTPUT_PPTX)
    print(f"[SUCCESS] PowerPoint presentation saved to {OUTPUT_PPTX}")

if __name__ == "__main__":
    create_deck()
