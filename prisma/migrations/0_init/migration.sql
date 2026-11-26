-- Agri Rakshak Initial PostgreSQL Database Migration
-- Problem Statement: SIH26131

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'farmer',
    "village" TEXT,
    "district" TEXT,
    "state" TEXT,
    "farmSizeAcres" DOUBLE PRECISION,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "assignedJurisdiction" TEXT,
    "badgeNumber" TEXT,
    "administrativeRegion" TEXT,
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "salt" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable Case
CREATE TABLE IF NOT EXISTS "Case" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "farmerName" TEXT NOT NULL,
    "farmerPhone" TEXT,
    "farmSizeAcres" DOUBLE PRECISION,
    "cropName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "severity" TEXT NOT NULL DEFAULT 'moderate',
    "growthStage" TEXT,
    "village" TEXT,
    "district" TEXT,
    "state" TEXT,
    "description" TEXT NOT NULL,
    "symptoms" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "aiAnalysis" JSONB,
    "officerReview" JSONB,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable CaseTimeline
CREATE TABLE IF NOT EXISTS "CaseTimeline" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "actorId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable Notification
CREATE TABLE IF NOT EXISTS "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "caseId" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'info',
    "targetRole" TEXT NOT NULL DEFAULT 'all',
    "targetUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable OutbreakAlert
CREATE TABLE IF NOT EXISTS "OutbreakAlert" (
    "id" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "affectedRegion" TEXT NOT NULL,
    "dominantIssue" TEXT NOT NULL,
    "caseCount" INTEGER NOT NULL DEFAULT 1,
    "trend" TEXT NOT NULL DEFAULT 'increasing',
    "severity" TEXT NOT NULL DEFAULT 'high',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recommendedAction" TEXT NOT NULL,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OutbreakAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable Hotspot
CREATE TABLE IF NOT EXISTS "Hotspot" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "village" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "caseCount" INTEGER NOT NULL DEFAULT 1,
    "severity" TEXT NOT NULL DEFAULT 'moderate',
    "dominantIssue" TEXT NOT NULL,
    "dominantCategory" TEXT NOT NULL DEFAULT 'pest',
    "trend" TEXT NOT NULL DEFAULT 'increasing',
    "affectedCrops" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lastReportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "officersAssigned" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Hotspot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_district_idx" ON "User"("district");
CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"("phone");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Case_farmerId_idx" ON "Case"("farmerId");
CREATE INDEX IF NOT EXISTS "Case_status_idx" ON "Case"("status");
CREATE INDEX IF NOT EXISTS "Case_severity_idx" ON "Case"("severity");
CREATE INDEX IF NOT EXISTS "Case_district_idx" ON "Case"("district");
CREATE INDEX IF NOT EXISTS "Case_reportedAt_idx" ON "Case"("reportedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "CaseTimeline_caseId_idx" ON "CaseTimeline"("caseId");
CREATE INDEX IF NOT EXISTS "CaseTimeline_timestamp_idx" ON "CaseTimeline"("timestamp");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Notification_targetUserId_idx" ON "Notification"("targetUserId");
CREATE INDEX IF NOT EXISTS "Notification_targetRole_idx" ON "Notification"("targetRole");
CREATE INDEX IF NOT EXISTS "Notification_read_idx" ON "Notification"("read");
CREATE INDEX IF NOT EXISTS "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "OutbreakAlert_severity_idx" ON "OutbreakAlert"("severity");
CREATE INDEX IF NOT EXISTS "OutbreakAlert_acknowledged_idx" ON "OutbreakAlert"("acknowledged");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Hotspot_district_idx" ON "Hotspot"("district");
CREATE INDEX IF NOT EXISTS "Hotspot_severity_idx" ON "Hotspot"("severity");

-- AddForeignKey
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Case_farmerId_fkey') THEN
        ALTER TABLE "Case" ADD CONSTRAINT "Case_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CaseTimeline_caseId_fkey') THEN
        ALTER TABLE "CaseTimeline" ADD CONSTRAINT "CaseTimeline_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Notification_targetUserId_fkey') THEN
        ALTER TABLE "Notification" ADD CONSTRAINT "Notification_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
