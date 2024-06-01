import { Request, Response } from "express";
import { MovieService } from "../service";

const movieService = new MovieService();

const listAllMovie = async (req: Request, res: Response) => {
  try {
    const cityId = req?.query?.city_id;
    const allMovie = await movieService.allMovie(cityId);
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

export { listAllMovie, movieDetail };
