import { Request, Response } from "express";
import { MovieService } from "../service";

const movieService = new MovieService();

const listAllMovie = async (req: Request, res: Response) => {
  try {
    const allMovie = await movieService.allMovie();
    return res.status(200).json({ data: allMovie });
  } catch (error) {}
};

const movieDetail = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req?.params;
    const movie = await movieService.movieById(movie_id);
    return res.status(200).json({ data: movie });
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

export { listAllMovie, movieDetail, theaterByCity };
