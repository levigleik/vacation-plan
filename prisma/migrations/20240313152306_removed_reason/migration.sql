/*
  Warnings:

  - You are about to drop the column `reasonId` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the `ReasonVacation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_reasonId_fkey";

-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "reasonId";

-- DropTable
DROP TABLE "ReasonVacation";
