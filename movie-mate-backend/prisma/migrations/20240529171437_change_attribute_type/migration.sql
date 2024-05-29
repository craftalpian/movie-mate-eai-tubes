/*
  Warnings:

  - You are about to drop the column `movie_theaterMovie_theater_id` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `movie_theaterMovie_theater_id` on the `theater` table. All the data in the column will be lost.
  - Added the required column `movie_id` to the `movie_theater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theater_id` to the `movie_theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movie" DROP CONSTRAINT "movie_movie_theaterMovie_theater_id_fkey";

-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_movie_theaterMovie_theater_id_fkey";

-- AlterTable
ALTER TABLE "movie" DROP COLUMN "movie_theaterMovie_theater_id";

-- AlterTable
ALTER TABLE "movie_theater" ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "theater_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "theater" DROP COLUMN "movie_theaterMovie_theater_id";
