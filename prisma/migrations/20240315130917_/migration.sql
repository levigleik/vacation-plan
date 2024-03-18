/*
  Warnings:

  - You are about to drop the `_DateVacationToVacation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vacationId` to the `DateVacation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DateVacationToVacation" DROP CONSTRAINT "_DateVacationToVacation_A_fkey";

-- DropForeignKey
ALTER TABLE "_DateVacationToVacation" DROP CONSTRAINT "_DateVacationToVacation_B_fkey";

-- AlterTable
ALTER TABLE "DateVacation" ADD COLUMN     "vacationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DateVacationToVacation";

-- AddForeignKey
ALTER TABLE "DateVacation" ADD CONSTRAINT "DateVacation_vacationId_fkey" FOREIGN KEY ("vacationId") REFERENCES "Vacation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
