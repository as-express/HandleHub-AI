/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Complaint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_regionId_fkey";

-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "categoryId",
DROP COLUMN "regionId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Region";
