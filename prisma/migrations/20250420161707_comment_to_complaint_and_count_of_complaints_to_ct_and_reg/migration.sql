-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "complaintsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "complaintsCount" INTEGER NOT NULL DEFAULT 0;
