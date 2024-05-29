/*
  Warnings:

  - You are about to drop the column `pricePrice_id` on the `theater` table. All the data in the column will be lost.
  - You are about to drop the `price` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[schedule_key]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_key` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_pricePrice_id_fkey";

-- DropIndex
DROP INDEX "schedule_schedule_id_key";

-- AlterTable
ALTER TABLE "movie_theater" ADD COLUMN     "weekday_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weekend_price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "schedule_key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "theater" DROP COLUMN "pricePrice_id";

-- DropTable
DROP TABLE "price";

-- CreateIndex
CREATE UNIQUE INDEX "schedule_schedule_key_key" ON "schedule"("schedule_key");
