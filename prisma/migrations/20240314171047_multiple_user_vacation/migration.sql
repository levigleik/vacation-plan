/*
  Warnings:

  - You are about to drop the column `userId` on the `Vacation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_userId_fkey";

-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserToVacation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVacation_AB_unique" ON "_UserToVacation"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVacation_B_index" ON "_UserToVacation"("B");

-- AddForeignKey
ALTER TABLE "_UserToVacation" ADD CONSTRAINT "_UserToVacation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVacation" ADD CONSTRAINT "_UserToVacation_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
