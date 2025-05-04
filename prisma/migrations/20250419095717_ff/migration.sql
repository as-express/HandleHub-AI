/*
  Warnings:

  - Changed the type of `urgency` on the `Complaint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "urgency",
ADD COLUMN     "urgency" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Urgency";
