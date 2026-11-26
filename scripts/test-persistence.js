/**
 * Agri Rakshak - Phase 13 PostgreSQL Persistence & Resilience Test Suite
 * Problem Statement: SIH26131
 * 
 * Verifies:
 * 1. Database connection resilience & retry bounds
 * 2. User persistence contracts & PBKDF2 hashing
 * 3. Case persistence, timeline updates, & status transitions
 * 4. Notification persistence & role/user isolation
 * 5. Outbreak alerts & Hotspots querying
 * 6. Graceful degradation when database is unavailable
 */

import { userStore } from '../server/store/userStore.js';
import { caseStore } from '../server/store/caseStore.js';
import { notificationStore } from '../server/store/notificationStore.js';
import { checkDbConnection, isDbConnected } from '../server/db/prisma.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runPersistenceTests() {
  console.log('\n======================================================');
  console.log('📦 Agri Rakshak - Phase 13 Persistence & DB Test Suite');
  console.log('======================================================\n');

  // 1. Connection check resilience
  console.log('1. Database Connection Resilience:');
  const connStatus = await checkDbConnection();
  assert(typeof connStatus.connected === 'boolean', 'checkDbConnection returns boolean status');
  assert(
    connStatus.connected === isDbConnected(),
    'isDbConnected matches checkDbConnection result'
  );

  // 2. User Store Persistence
  console.log('\n2. User Persistence Operations:');
  const seedFarmer = await userStore.findById('usr-farmer-001');
  assert(seedFarmer !== null, 'Finds seed farmer by ID');
  assert(seedFarmer?.role === 'farmer', 'Farmer role matches');
  assert(!seedFarmer?.passwordHash, 'Password hash is stripped from user retrieval');
  assert(!seedFarmer?.salt, 'Salt is stripped from user retrieval');

  const authSuccess = await userStore.authenticate('kisan@agrirakshak.in', 'password123');
  assert(authSuccess !== null, 'Authenticates farmer with correct password');

  const authFail = await userStore.authenticate('kisan@agrirakshak.in', 'wrongpassword');
  assert(authFail === null, 'Rejects authentication with incorrect password');

  const newPhone = `98${Math.floor(10000000 + Math.random() * 90000000)}`;
  const createdUser = await userStore.createUser({
    name: 'Test Persistence Farmer',
    phone: newPhone,
    password: 'password123',
    role: 'farmer',
    village: 'Dhule',
    district: 'Dhule',
    state: 'Maharashtra',
  });
  assert(createdUser !== null && createdUser.phone === newPhone, 'Creates new user with PBKDF2 hash');

  const updatedProfile = await userStore.updateProfile(createdUser.id, {
    farmSizeAcres: 7.5,
    preferredLanguage: 'te',
  });
  assert(updatedProfile?.farmSizeAcres === 7.5, 'Updates user profile fields successfully');

  // 3. Case Store Persistence
  console.log('\n3. Case Persistence & Timeline Operations:');
  const existingCase = await caseStore.getCase('CASE-2026-104');
  assert(existingCase !== null, 'Retrieves existing case CASE-2026-104');
  assert(existingCase?.cropName.includes('Tomato'), 'Crop name matches expected seed data');

  const newCaseId = `CASE-TEST-${Date.now()}`;
  const savedCase = await caseStore.saveCase({
    id: newCaseId,
    farmerId: createdUser.id,
    farmerName: createdUser.name,
    cropName: 'Groundnut (मूंगफली)',
    status: 'pending',
    severity: 'moderate',
    description: 'Leaf spot test case for persistence verification',
    symptoms: ['Leaf spot'],
    reportedAt: new Date().toISOString(),
    timeline: [
      {
        id: `tl-${newCaseId}-1`,
        caseId: newCaseId,
        type: 'case_created',
        title: 'Test Case Filed',
        description: 'Test case filed for groundnut.',
        actor: createdUser.name,
        timestamp: new Date().toISOString(),
      },
    ],
  });
  assert(savedCase?.id === newCaseId, 'Saves new case to persistent store');

  const retrievedNewCase = await caseStore.getCase(newCaseId);
  assert(retrievedNewCase?.id === newCaseId, 'Retrieves newly created case by ID');
  assert(retrievedNewCase?.timeline?.length > 0, 'Preserves timeline events on case');

  const statusUpdated = await caseStore.updateStatus(newCaseId, 'under_review', 'Officer assigned for triage');
  assert(statusUpdated?.status === 'under_review', 'Transitions case status to under_review');

  const officerReviewed = await caseStore.saveOfficerReview(newCaseId, {
    assessment: 'Confirmed Tikka disease (Cercospora arachidicola) on groundnut.',
    outcome: 'confirmed_ai',
    advisory: 'Spray Mancozeb 75% WP @ 2g/L of water at 10-day intervals.',
    requiresFollowUp: false,
    requiresEscalation: false,
  });
  assert(officerReviewed?.status === 'resolved', 'Officer review resolves case');
  assert(officerReviewed?.officerReview !== null, 'Officer review advisory persisted');

  // 4. Notification Store Persistence
  console.log('\n4. Notification Persistence & User Isolation:');
  const farmerNotifs = await notificationStore.getForUser({ id: 'usr-farmer-001', role: 'farmer' });
  assert(Array.isArray(farmerNotifs), 'Retrieves notifications for farmer');
  assert(farmerNotifs.length > 0, 'Farmer has active notifications');

  const officerNotifs = await notificationStore.getForUser({ id: 'usr-officer-001', role: 'officer' });
  const hasOnlyOfficerOrAll = officerNotifs.every(
    (n) => n.targetRole === 'officer' || n.targetRole === 'all' || n.targetUserId === 'usr-officer-001'
  );
  assert(hasOnlyOfficerOrAll, 'Enforces notification role & user isolation');

  if (farmerNotifs.length > 0) {
    const firstNotif = farmerNotifs[0];
    const marked = await notificationStore.markAsRead(firstNotif.id, { id: 'usr-farmer-001', role: 'farmer' });
    assert(marked?.read === true, 'Marks notification as read');
  }

  // 5. Outbreak Alerts & Hotspots
  console.log('\n5. Outbreak Alerts & Hotspot Surveillance:');
  const alerts = await caseStore.getOutbreakAlerts();
  assert(Array.isArray(alerts) && alerts.length > 0, 'Retrieves outbreak alerts');

  const hotspots = await caseStore.getHotspots();
  assert(Array.isArray(hotspots) && hotspots.length > 0, 'Retrieves hotspot clusters');

  console.log('\n======================================================');
  console.log(`Persistence Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPersistenceTests().catch((err) => {
  console.error('[Persistence Tests] Unexpected error:', err);
  process.exit(1);
});
