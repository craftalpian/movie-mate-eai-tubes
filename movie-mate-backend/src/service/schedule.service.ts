import { PrismaClient } from "@prisma/client";

class ScheduleService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async scheduleList({
    city_id,
    movie_id,
  }: {
    city_id: string;
    movie_id: string;
  }) {
    return await this.prismaClient
      .$queryRaw`select * from daily_movie_schedule where city_id = ${city_id} and movie_id = ${movie_id};`;
  }
}

export default ScheduleService;
