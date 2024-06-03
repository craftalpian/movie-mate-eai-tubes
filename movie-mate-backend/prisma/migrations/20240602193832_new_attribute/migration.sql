/*
  Warnings:

  - You are about to drop the column `user_id` on the `session_mate` table. All the data in the column will be lost.
  - Added the required column `movie_id` to the `favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `session_mate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favourite" ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "nim" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "session_mate" DROP COLUMN "user_id",
ADD COLUMN     "nim" TEXT NOT NULL;
