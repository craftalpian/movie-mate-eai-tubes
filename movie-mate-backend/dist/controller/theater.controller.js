"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllTheater = void 0;
const service_1 = require("../service");
const theaterService = new service_1.TheaterService();
const listAllTheater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city_id, movie_id } = req === null || req === void 0 ? void 0 : req.query;
        const allTheater = yield theaterService.theaterList({ city_id, movie_id });
        return res.status(200).json({ data: allTheater });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.listAllTheater = listAllTheater;
