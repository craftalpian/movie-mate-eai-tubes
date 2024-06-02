import express from "express";
import {
  listAllCity,
  listAllMovie,
  movieDetail,
  listAllTheater,
  listAllSchedule,
  login,
  detail,
} from "../controller";

const router = express.Router();

router.get("/theater", listAllTheater);
router.get("/movie", listAllMovie);
router.get("/movie/:movie_id", movieDetail);
router.get("/city", listAllCity);
router.get("/schedule", listAllSchedule);
router.post("/auth/login", login);
router.get("/auth", detail);

export default router;
