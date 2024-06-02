import { Request, Response } from "express";
import { ScheduleService } from "../service";

const scheduleService = new ScheduleService();

const listAllSchedule = async (req: Request, res: Response) => {
  try {
    const { movie_theater_id, start_timestamp }: any = req?.query;
    const allSchedule = await scheduleService.scheduleList({
      movie_theater_id,
      start_timestamp,
    });
    return res.status(200).json({ data: allSchedule });
  } catch (error) {
    console.error({ error });
  }
};

export { listAllSchedule };
