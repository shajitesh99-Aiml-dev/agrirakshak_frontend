# Agri Rakshak — Field Pilot Readiness & Supervised Demonstration Checklist
**Smart India Hackathon 2026 (SIH26131)**

This operational checklist governs the execution of small, supervised field demonstrations involving farmers, agricultural extension officers, and Krishi Vigyan Kendra (KVK) personnel.

---

## 1. Role-Based Access & Pilot Demonstration Accounts

| Role | Demo Identifier | Access Scope | Security Controls |
| :--- | :--- | :--- | :--- |
| **Farmer** | `kisan@agrirakshak.in` / `9876543210` | Own farm dashboard, report crop disease, view verified advisories, AI diagnosis. | Strictly isolated from other farmers' crop reports via server-side ownership validation. |
| **Agricultural Officer** | `officer@agrirakshak.in` / `9876543211` | Regional triage queue, AI diagnostic verification, expert prescription issuance, field visit scheduling. | Authorized to inspect cases within assigned agro-ecological jurisdiction. |
| **Administrator** | `admin@agrirakshak.in` / `9876543212` | System-wide surveillance map, regional cluster hotspots, outbreak quarantine alerts, audit telemetry. | Full administrative privileges; protected by role enforcement. |

---

## 2. Farmer Informed Consent & Privacy Notice

- [ ] **Pre-Submission Consent Gate**: Ensure every participating farmer is presented with the consent modal before crop photograph capture or upload.
- [ ] **Data Minimization Rule**: Confirm that farmer name, phone number, and GPS home coordinates are stripped from the AI payload before calling external LLM providers.
- [ ] **Image Rights**: Inform the farmer that submitted crop disease photos are used strictly for agronomic pathology diagnosis and quarantine tracking.
- [ ] **Regional Language Clarity**: Deliver the consent notice in the farmer's preferred regional language (Telugu, Hindi, Kannada, or English).

---

## 3. Agricultural Safety & AI Decision-Support Framing

- [ ] **Non-Guaranteed Advice**: Remind all participating farmers and officers that AI pathology detections represent advisory decision-support, not a 100% guaranteed diagnosis or substitute for state agricultural department directives.
- [ ] **Confidence Threshold Guard**: Verify that any diagnostic inference with confidence $<65\%$ automatically triggers mandatory Agricultural Officer escalation.
- [ ] **No Unsupported Chemical Claims**: Ensure model advisories stick strictly to verified bio-pesticides (e.g. *Trichoderma viride*, Neem Seed Kernel Extract 5%) and advise consultation with local KVK before chemical foliar sprays.
- [ ] **Safe Fallback**: In the event of network disruption or provider failure, the platform delivers safe agronomic cultural practices (crop sanitation, water management) rather than failing abruptly.

---

## 4. Officer Review & Escalation Workflow

- [ ] **Triage Verification**: Demonstrate an Agricultural Officer reviewing an incoming case, comparing observed symptoms with AI inference, and issuing a signed advisory.
- [ ] **Field Visit Protocol**: For quarantine threats (e.g., Pink Bollworm or Fall Armyworm), schedule a field inspection via the Officer Portal with location and date tracking.
- [ ] **Notification Dispatch**: Verify that farmer receives immediate in-app and SMS advisory notification once the officer completes the review.

---

## 5. Offline Resiliency & Connectivity Loss

- [ ] **Client State Caching**: Forms and wizard state are cached in React state; accidental browser reloads during reporting preserve entered data.
- [ ] **Graceful Network Handling**: When 4G/5G mobile data connectivity drops in remote fields, clear localized offline messages guide the farmer to retry without crashing.
- [ ] **Bounded Retries**: API client implements bounded request timeouts (20 seconds) to prevent battery drainage and hanging network connections on field devices.

---

## 6. Data Integrity & PostgreSQL Backup

- [ ] **Automated Backup Command**: Verify `pg_dump` can create an encrypted snapshot prior to the pilot demonstration:
  ```bash
  docker compose exec -T db pg_dump -U postgres agri_rakshak > backup_pilot_pre.sql
  ```
- [ ] **Safe Recovery Verification**: Verify that the database can be restored from the snapshot in under 60 seconds:
  ```bash
  docker compose exec -T db psql -U postgres agri_rakshak < backup_pilot_pre.sql
  ```

---

## 7. Incident & Anomaly Reporting Procedure

In the event of an inaccurate AI diagnosis or technical glitch during the field pilot:
1. **Flag In-App**: The agricultural officer taps "Dispute AI Diagnosis" on the case review screen.
2. **Corrective Diagnosis**: The officer records the correct ground-truth pathology label and prescription.
3. **Audit Log Export**: The platform writes an audit entry containing `caseId`, `modelConfidence`, `officerCorrection`, and timestamp without exposing personal farmer identifiers.
4. **Model Retraining Queue**: The disputed case is flagged for offline model fine-tuning and validation.
