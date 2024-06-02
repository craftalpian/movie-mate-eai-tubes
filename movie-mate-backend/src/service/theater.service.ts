import { PrismaClient } from "@prisma/client";

class TheaterService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async theaterList({
    city_id,
    movie_id,
  }: {
    city_id: string;
    movie_id: string;
  }) {
    return await this.prismaClient
      .$queryRaw`select distinct theater_name, theater_id, weekday_price, weekend_price, movie_theater_id from daily_movie_schedule where city_id = ${city_id} and movie_id = ${movie_id};`;
  }
}

export default TheaterService;
