/*
  Warnings:

  - You are about to drop the column `category` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Complaint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "category",
DROP COLUMN "region";
