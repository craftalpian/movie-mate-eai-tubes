import { Request, Response } from "express";
import { ScheduleService } from "../service";

const scheduleService = new ScheduleService();

const listAllSchedule = async (req: Request, res: Response) => {
  try {
    const { city_id, movie_id }: any = req?.query;
    const allSchedule = await scheduleService.scheduleList({
      city_id,
      movie_id,
    });
    return res.status(200).json({ data: allSchedule });
  } catch (error) {
    console.error({ error });
  }
};

export { listAllSchedule };
