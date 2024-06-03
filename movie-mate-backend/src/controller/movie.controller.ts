import { Request, Response } from "express";
import { AuthService, MovieService } from "../service";

const movieService = new MovieService();
const authService = new AuthService();

const listAllMovie = async (req: Request, res: Response) => {
  try {
    const cityId = req?.query?.city_id;
    let { cookie } = req?.headers;
    let nim: any = null;
    if (cookie) {
      console.log({ cookie });
      cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
      const { nim: nimRes } = await authService.detail({ cookie });
      nim = nimRes;
    }
    const allMovie = await movieService.allMovie({ city_id: cityId, nim });
    return res.status(200).json({ data: allMovie });
  } catch (error: any) {
    console.log({ error });
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

const addFavourite = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req?.params;
    let { cookie } = req?.headers;
    cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
    const { nim } = await authService.detail({ cookie });
    if (!nim) throw new Error("Harap login");
    await movieService.addFavourite({ movie_id, nim });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

const deleteFavourite = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req?.params;
    let { cookie } = req?.headers;
    cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
    const { nim } = await authService.detail({ cookie });
    if (!nim) throw new Error("Harap login");
    await movieService.deleteFavourite({ movie_id, nim });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

const movieDetail = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req?.params;
    let { cookie } = req?.headers;
    let nim: any = null;
    if (cookie) {
      console.log({ cookie });
      cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
      const { nim: nimRes } = await authService.detail({ cookie });
      nim = nimRes;
    }
    const movie = await movieService.movieById({ movie_id, nim });
    return res.status(200).json({ data: movie });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

export { listAllMovie, movieDetail, addFavourite, deleteFavourite };
