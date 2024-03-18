/*
  Warnings:

  - Added the required column `location` to the `Vacation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacation" ADD COLUMN     "location" TEXT NOT NULL;
