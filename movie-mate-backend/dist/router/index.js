"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.get("/movie", controller_1.listAllMovie);
router.get("/city", controller_1.listAllCity);
router.get("/theater", controller_1.theaterByCity);
exports.default = router;
