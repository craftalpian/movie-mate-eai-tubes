import { Request, Response } from "express";
import { CityService } from "../service";

const cityService = new CityService();

const listAllCity = async (req: Request, res: Response) => {
  try {
    const allCity = await cityService.allCity();
    return res.json({ data: allCity });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

export { listAllCity };
