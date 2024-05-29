/*
  Warnings:

  - Added the required column `city_id` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_theaterTheater_id_fkey";

-- AlterTable
ALTER TABLE "city" ADD COLUMN     "city_url" TEXT;

-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "theater_url" TEXT;
