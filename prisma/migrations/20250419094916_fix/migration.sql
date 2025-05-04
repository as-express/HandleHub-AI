-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "files" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "anonymous" SET DEFAULT true;
