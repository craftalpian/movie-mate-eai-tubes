import { Request, Response } from "express";
import { MovieService } from "../service";

const movieService = new MovieService();

const listAllMovie = async (req: Request, res: Response) => {
  try {
    const allMovie = await movieService.allMovie();
    return res.json({ data: allMovie });
  } catch (error) {}
};

export { listAllMovie };
