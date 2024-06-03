"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.get("/theater", controller_1.listAllTheater);
router.get("/movie", controller_1.listAllMovie);
router.get("/movie/:movie_id", controller_1.movieDetail);
router.get("/city", controller_1.listAllCity);
router.get("/schedule", controller_1.listAllSchedule);
router.post("/schedule/:schedule_id", controller_1.watchMovieBySchedule);
router.post("/auth/login", controller_1.login);
router.get("/auth", controller_1.detail);
exports.default = router;
