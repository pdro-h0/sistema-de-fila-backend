/*
  Warnings:

  - You are about to drop the column `name` on the `queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "histories" ALTER COLUMN "called_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "queues" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "clients_category_idx" ON "clients"("category");
