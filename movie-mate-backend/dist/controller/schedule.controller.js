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
exports.watchMovieBySchedule = exports.listAllSchedule = void 0;
const service_1 = require("../service");
const scheduleService = new service_1.ScheduleService();
const authService = new service_1.AuthService();
const listAllSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movie_theater_id, start_timestamp } = req === null || req === void 0 ? void 0 : req.query;
        const allSchedule = yield scheduleService.scheduleList({
            movie_theater_id,
            start_timestamp,
        });
        return res.status(200).json({ data: allSchedule });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.listAllSchedule = listAllSchedule;
const watchMovieBySchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schedule_id } = req === null || req === void 0 ? void 0 : req.params;
        let { cookie } = req === null || req === void 0 ? void 0 : req.headers;
        cookie = decodeURIComponent((cookie === null || cookie === void 0 ? void 0 : cookie.split("igracias=")[1]) || "");
        const { nim } = yield authService.detail({ cookie });
        yield scheduleService.joinSchedule({ nim, schedule_id });
        return res.status(200).json({ status: true });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.watchMovieBySchedule = watchMovieBySchedule;
