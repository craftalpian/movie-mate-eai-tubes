import { Request, Response } from "express";
import { TheaterService } from "../service";

const theaterService = new TheaterService();

const listAllTheater = async (req: Request, res: Response) => {
  try {
    const { city_id, movie_id }: any = req?.query;
    const allTheater = await theaterService.theaterList({ city_id, movie_id });
    return res.status(200).json({ data: allTheater });
  } catch (error) {
    console.error({ error });
  }
};

export { listAllTheater };
