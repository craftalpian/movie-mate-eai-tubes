import { PrismaClient } from "@prisma/client";
import { id } from "../utils";
import amqp from "amqplib";

class ScheduleService {
  private prismaClient;
  private QUEUE_NAME = "notifications";

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async setupRabbitMQ() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(this.QUEUE_NAME, { durable: true });
    return channel;
  }

  async joinSchedule({
    nim,
    schedule_id,
  }: {
    nim: string;
    schedule_id: string;
  }) {
    const check = await this.prismaClient.session_mate.count({
      where: {
        nim,
        schedule_id,
      },
    });

    if (check < 1) {
      await this.prismaClient.session_mate.create({
        data: {
          nim,
          schedule_id,
          session_mate_id: id("sm"),
        },
      });

      const channel = await this.setupRabbitMQ();
      channel.sendToQueue(this.QUEUE_NAME, Buffer.from("New notification"));
    }

    return true;
  }

  async scheduleList({
    movie_theater_id,
    start_timestamp,
  }: {
    movie_theater_id: string;
    start_timestamp: string;
  }) {
    const schedules = await this.prismaClient.schedule.findMany({
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

    const schedulesCombine = await Promise.all(
      (schedules || [])?.map(async (schedule) => {
        const listViewer = await this.prismaClient.session_mate.findMany({
          where: {
            schedule_id: schedule?.schedule_id,
          },
          select: {
            nim: true,
            session_mate_id: true,
          },
        });

        const viewerDetail = await Promise.all(
          (listViewer || [])?.map(async ({ nim }) => {
            const user = await this.prismaClient.igracias.findFirst({
              where: {
                nim,
              },
              select: {
                image_url: true,
                full_name: true,
                nim: true,
              },
            });

            return user;
          })
        );

        return {
          ...schedule,
          mates: viewerDetail,
        };
      })
    );

    return schedulesCombine;
  }
}

export default ScheduleService;
