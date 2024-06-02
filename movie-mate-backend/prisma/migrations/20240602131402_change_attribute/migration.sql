/*
  Warnings:

  - You are about to drop the column `client_api` on the `igracias` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `igracias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "igracias" DROP COLUMN "client_api",
ADD COLUMN     "client_id" TEXT NOT NULL;
