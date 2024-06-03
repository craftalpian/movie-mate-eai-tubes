import { Request, Response } from "express";
import { AuthService, ScheduleService, WebSocketService } from "../service";

const scheduleService = new ScheduleService();
const authService = new AuthService();

const listAllSchedule = async (req: Request, res: Response) => {
  try {
    const { movie_theater_id, start_timestamp }: any = req?.query;
    const allSchedule = await scheduleService.scheduleList({
      movie_theater_id,
      start_timestamp,
    });
    return res.status(200).json({ data: allSchedule });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

const watchMovieBySchedule = async (
  req: Request,
  res: Response
  // webSocketService: WebSocketService
) => {
  try {
    const { schedule_id }: any = req?.params;
    let { cookie } = req?.headers;
    cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
    const { nim } = await authService.detail({ cookie });
    if (!nim) throw new Error("Harap login");
    await scheduleService.joinSchedule({ nim, schedule_id });
    // webSocketService.sendMessageToClients("tessss");
    return res.status(200).json({ status: true });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

export { listAllSchedule, watchMovieBySchedule };
