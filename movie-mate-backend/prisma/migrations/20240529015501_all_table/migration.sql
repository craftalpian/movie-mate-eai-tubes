-- CreateEnum
CREATE TYPE "Day" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- AlterTable
ALTER TABLE "city" ADD COLUMN     "theaterTheater_id" TEXT;

-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "favouriteFavourite_id" TEXT,
ADD COLUMN     "movie_theaterMovie_theater_id" TEXT;

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "session_mateSession_mate_id" TEXT,
    "favouriteFavourite_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "schedule_id" TEXT NOT NULL,
    "start_timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_mateSession_mate_id" TEXT,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "price" (
    "price_id" TEXT NOT NULL,
    "day" "Day" NOT NULL DEFAULT 'sunday',
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_pkey" PRIMARY KEY ("price_id")
);

-- CreateTable
CREATE TABLE "favourite" (
    "favourite_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "favourite_pkey" PRIMARY KEY ("favourite_id")
);

-- CreateTable
CREATE TABLE "session_mate" (
    "session_mate_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_mate_pkey" PRIMARY KEY ("session_mate_id")
);

-- CreateTable
CREATE TABLE "movie_theater" (
    "movie_theater_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduleSchedule_id" TEXT,

    CONSTRAINT "movie_theater_pkey" PRIMARY KEY ("movie_theater_id")
);

-- CreateTable
CREATE TABLE "theater" (
    "theater_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movie_theaterMovie_theater_id" TEXT,
    "pricePrice_id" TEXT,

    CONSTRAINT "theater_pkey" PRIMARY KEY ("theater_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_schedule_id_key" ON "schedule"("schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "price_price_id_key" ON "price"("price_id");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_favourite_id_key" ON "favourite"("favourite_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_mate_session_mate_id_key" ON "session_mate"("session_mate_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_theater_movie_theater_id_key" ON "movie_theater"("movie_theater_id");

-- CreateIndex
CREATE UNIQUE INDEX "theater_theater_id_key" ON "theater"("theater_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_session_mateSession_mate_id_fkey" FOREIGN KEY ("session_mateSession_mate_id") REFERENCES "session_mate"("session_mate_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_favouriteFavourite_id_fkey" FOREIGN KEY ("favouriteFavourite_id") REFERENCES "favourite"("favourite_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_movie_theaterMovie_theater_id_fkey" FOREIGN KEY ("movie_theaterMovie_theater_id") REFERENCES "movie_theater"("movie_theater_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_favouriteFavourite_id_fkey" FOREIGN KEY ("favouriteFavourite_id") REFERENCES "favourite"("favourite_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_session_mateSession_mate_id_fkey" FOREIGN KEY ("session_mateSession_mate_id") REFERENCES "session_mate"("session_mate_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_theater" ADD CONSTRAINT "movie_theater_scheduleSchedule_id_fkey" FOREIGN KEY ("scheduleSchedule_id") REFERENCES "schedule"("schedule_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_movie_theaterMovie_theater_id_fkey" FOREIGN KEY ("movie_theaterMovie_theater_id") REFERENCES "movie_theater"("movie_theater_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_pricePrice_id_fkey" FOREIGN KEY ("pricePrice_id") REFERENCES "price"("price_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_theaterTheater_id_fkey" FOREIGN KEY ("theaterTheater_id") REFERENCES "theater"("theater_id") ON DELETE SET NULL ON UPDATE CASCADE;
