import { PrismaClient } from "@prisma/client";

class ScheduleService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async scheduleList({
    movie_theater_id,
    start_timestamp,
  }: {
    movie_theater_id: string;
    start_timestamp: string;
  }) {
    return await this.prismaClient.schedule.findMany({
      where: {
        movie_theater_id,
        start_timestamp: {
          gte: start_timestamp,
        },
      },
      select: {
        start_timestamp: true,
        schedule_id: true,
        start_time: true,
      },
    });
  }
}

export default ScheduleService;
