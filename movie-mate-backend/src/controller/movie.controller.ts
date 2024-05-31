import { Request, Response } from "express";
import { MovieService } from "../service";

const movieService = new MovieService();

const listAllMovie = async (req: Request, res: Response) => {
  try {
    const allMovie = await movieService.allMovie();
    return res.json({ data: allMovie });
  } catch (error) {}
};

const theaterByCity = async (req: Request, res: Response) => {
  try {
    const allTheaterByCity = await movieService.theaterByCity(
      "city_4ZZgO8GT0PmnV75ZLm5v"
    );
    return res.json({ data: allTheaterByCity });
  } catch (error) {}
};

export { listAllMovie, theaterByCity };
