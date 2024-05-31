import express from "express";
import { listAllCity, listAllMovie, theaterByCity, movieDetail } from "../controller";

const router = express.Router();

router.get("/movie", listAllMovie);
router.get("/movie/:movie_id", movieDetail);
router.get("/city", listAllCity);
router.get("/theater", theaterByCity);

export default router;
