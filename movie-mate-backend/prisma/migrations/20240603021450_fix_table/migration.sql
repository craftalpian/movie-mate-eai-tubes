/*
  Warnings:

  - You are about to drop the column `favouriteFavourite_id` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movie" DROP CONSTRAINT "movie_favouriteFavourite_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_favouriteFavourite_id_fkey";

-- AlterTable
ALTER TABLE "movie" DROP COLUMN "favouriteFavourite_id";

-- DropTable
DROP TABLE "user";
