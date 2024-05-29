/*
  Warnings:

  - Added the required column `movie_theater_id` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movie_theater" DROP CONSTRAINT "movie_theater_scheduleSchedule_id_fkey";

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "movie_theater_id" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT,
ALTER COLUMN "start_timestamp" DROP NOT NULL;
