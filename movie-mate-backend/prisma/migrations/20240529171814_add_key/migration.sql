/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `movie_theater` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `movie_theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "movie_theater_movie_theater_id_key";

-- AlterTable
ALTER TABLE "movie_theater" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movie_theater_key_key" ON "movie_theater"("key");
