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
exports.listAllSchedule = void 0;
const service_1 = require("../service");
const scheduleService = new service_1.ScheduleService();
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
        console.error({ error });
    }
});
exports.listAllSchedule = listAllSchedule;
