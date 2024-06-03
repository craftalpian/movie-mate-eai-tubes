import express, { Request, Response } from "express";
import {
  listAllCity,
  listAllMovie,
  movieDetail,
  listAllTheater,
  listAllSchedule,
  login,
  detail,
  watchMovieBySchedule,
  addFavourite,
  deleteFavourite,
} from "../controller";
import { WebSocketService } from "../service";

const route = (webSocketService: WebSocketService) => {
  const router = express.Router();

  router.get("/theater", listAllTheater);
  router.get("/movie", listAllMovie);
  router.get("/movie/:movie_id", movieDetail);
  router.post("/movie/:movie_id/favourite", addFavourite);
  router.delete("/movie/:movie_id/favourite", deleteFavourite);
  router.get("/city", listAllCity);
  router.get("/schedule", listAllSchedule);
  router.post("/schedule/:schedule_id", (req: Request, res: Response) =>
    watchMovieBySchedule(req, res, webSocketService)
  );
  router.post("/auth/login", login);
  router.get("/auth", detail);

  return router;
};

export default route;
