/*
  Warnings:

  - A unique constraint covering the columns `[theater_key]` on the table `theater` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `theater_key` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "theater_theater_id_key";

-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "theater_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "theater_theater_key_key" ON "theater"("theater_key");
