/*
  Warnings:

  - You are about to drop the column `session_mateSession_mate_id` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `session_mateSession_mate_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `session_mate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `session_mate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_session_mateSession_mate_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_session_mateSession_mate_id_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "session_mateSession_mate_id";

-- AlterTable
ALTER TABLE "session_mate" ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "session_mateSession_mate_id";
