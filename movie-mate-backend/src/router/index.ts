import express from "express";
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

const router = express.Router();

router.get("/theater", listAllTheater);
router.get("/movie", listAllMovie);
router.get("/movie/:movie_id", movieDetail);
router.post("/movie/:movie_id/favourite", addFavourite);
router.delete("/movie/:movie_id/favourite", deleteFavourite);
router.get("/city", listAllCity);
router.get("/schedule", listAllSchedule);
router.post("/schedule/:schedule_id", watchMovieBySchedule);
router.post("/auth/login", login);
router.get("/auth", detail);

export default router;
