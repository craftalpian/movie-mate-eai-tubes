/*
  Warnings:

  - The primary key for the `igracias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nik` on the `igracias` table. All the data in the column will be lost.
  - You are about to drop the column `nik` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nim]` on the table `igracias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nim` to the `igracias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "igracias_nik_key";

-- AlterTable
ALTER TABLE "igracias" DROP CONSTRAINT "igracias_pkey",
DROP COLUMN "nik",
ADD COLUMN     "nim" TEXT NOT NULL,
ADD CONSTRAINT "igracias_pkey" PRIMARY KEY ("nim");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "nik",
ADD COLUMN     "nim" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "igracias_nim_key" ON "igracias"("nim");
