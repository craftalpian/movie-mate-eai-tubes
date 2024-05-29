/*
  Warnings:

  - Added the required column `movie_url` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "movie_url" TEXT NOT NULL;
