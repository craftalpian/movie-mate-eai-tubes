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
const client_1 = require("@prisma/client");
class ScheduleService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    scheduleList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ movie_theater_id, start_timestamp, }) {
            return yield this.prismaClient.schedule.findMany({
                where: {
                    movie_theater_id,
                    start_timestamp: {
                        gte: start_timestamp,
                    },
                },
                select: {
                    start_timestamp: true,
                    schedule_id: true,
                    start_time: true,
                },
            });
        });
    }
}
exports.default = ScheduleService;
