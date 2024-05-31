import express from "express";
import { listAllCity, listAllMovie, theaterByCity } from "../controller";

const router = express.Router();

router.get("/movie", listAllMovie);
router.get("/city", listAllCity);
router.get("/theater", theaterByCity);

export default router;
