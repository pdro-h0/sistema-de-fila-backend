/*
  Warnings:

  - Added the required column `contact` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "contact" TEXT NOT NULL;
