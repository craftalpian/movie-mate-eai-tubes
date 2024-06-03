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
const utils_1 = require("../utils");
class ScheduleService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    joinSchedule(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nim, schedule_id, }) {
            const check = yield this.prismaClient.session_mate.count({
                where: {
                    nim,
                    schedule_id,
                },
            });
            if (check < 1) {
                yield this.prismaClient.session_mate.create({
                    data: {
                        nim,
                        schedule_id,
                        session_mate_id: (0, utils_1.id)("sm"),
                    },
                });
            }
            return true;
        });
    }
    scheduleList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ movie_theater_id, start_timestamp, }) {
            var _b;
            const schedules = yield this.prismaClient.schedule.findMany({
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
            const schedulesCombine = yield Promise.all((_b = (schedules || [])) === null || _b === void 0 ? void 0 : _b.map((schedule) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                const listViewer = yield this.prismaClient.session_mate.findMany({
                    where: {
                        schedule_id: schedule === null || schedule === void 0 ? void 0 : schedule.schedule_id,
                    },
                    select: {
                        nim: true,
                        session_mate_id: true,
                    },
                });
                const viewerDetail = yield Promise.all((_c = (listViewer || [])) === null || _c === void 0 ? void 0 : _c.map((_d) => __awaiter(this, [_d], void 0, function* ({ nim }) {
                    const user = yield this.prismaClient.igracias.findFirst({
                        where: {
                            nim,
                        },
                        select: {
                            image_url: true,
                            full_name: true,
                            nim: true,
                        },
                    });
                    return user;
                })));
                return Object.assign(Object.assign({}, schedule), { mates: viewerDetail });
            })));
            return schedulesCombine;
        });
    }
}
exports.default = ScheduleService;
