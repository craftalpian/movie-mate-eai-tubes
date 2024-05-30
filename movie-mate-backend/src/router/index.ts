import express from "express";
import { listAllCity, listAllMovie } from "../controller";

const router = express.Router();

router.get("/movie", listAllMovie);
router.get("/city", listAllCity);

export default router;
