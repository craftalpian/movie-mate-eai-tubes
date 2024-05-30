import express from "express";
import { listAllMovie } from "../controller";

const router = express.Router();

router.get("/movie", listAllMovie);

export default router;
