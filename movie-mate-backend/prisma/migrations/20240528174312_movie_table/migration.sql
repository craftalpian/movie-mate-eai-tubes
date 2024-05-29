-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('manual', 'automation');

-- CreateTable
CREATE TABLE "movie" (
    "movie_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "type" TEXT,
    "producer" TEXT,
    "director" TEXT,
    "writer" TEXT,
    "production" TEXT,
    "cast" TEXT,
    "minute" INTEGER NOT NULL DEFAULT 0,
    "synopsis" TEXT,
    "category" TEXT,
    "trailer_url" TEXT,
    "source_type" "SourceType" NOT NULL DEFAULT 'manual',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("movie_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_key_key" ON "movie"("key");
