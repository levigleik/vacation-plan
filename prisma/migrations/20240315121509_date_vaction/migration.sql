/*
  Warnings:

  - You are about to drop the column `endDate` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Vacation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- CreateTable
CREATE TABLE "DateVacation" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateVacation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DateVacationToVacation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DateVacationToVacation_AB_unique" ON "_DateVacationToVacation"("A", "B");

-- CreateIndex
CREATE INDEX "_DateVacationToVacation_B_index" ON "_DateVacationToVacation"("B");

-- AddForeignKey
ALTER TABLE "_DateVacationToVacation" ADD CONSTRAINT "_DateVacationToVacation_A_fkey" FOREIGN KEY ("A") REFERENCES "DateVacation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateVacationToVacation" ADD CONSTRAINT "_DateVacationToVacation_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
