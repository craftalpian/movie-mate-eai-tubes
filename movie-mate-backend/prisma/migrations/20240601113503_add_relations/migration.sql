/*
  Warnings:

  - You are about to drop the column `theaterTheater_id` on the `city` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "city" DROP COLUMN "theaterTheater_id";

-- AlterTable
ALTER TABLE "movie_theater" ADD COLUMN     "theaterTheater_id" TEXT;

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "movie_theaterMovie_theater_id" TEXT;

-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "cityCity_id" TEXT,
ADD COLUMN     "movieMovie_id" TEXT;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_movie_theaterMovie_theater_id_fkey" FOREIGN KEY ("movie_theaterMovie_theater_id") REFERENCES "movie_theater"("movie_theater_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_theater" ADD CONSTRAINT "movie_theater_theaterTheater_id_fkey" FOREIGN KEY ("theaterTheater_id") REFERENCES "theater"("theater_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_movieMovie_id_fkey" FOREIGN KEY ("movieMovie_id") REFERENCES "movie"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_cityCity_id_fkey" FOREIGN KEY ("cityCity_id") REFERENCES "city"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;
