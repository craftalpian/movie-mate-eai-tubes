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
class TheaterService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    theaterList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ city_id }) {
            // const today = moment().tz("Asia/Jakarta"); // GMT+7 time zone
            // const todayDate = today.format("YYYY-MM-DD");
            return yield this.prismaClient.theater.findMany({
                where: {
                    city_id,
                },
                select: {
                    name: true,
                    theater_id: true,
                    address: true,
                },
            });
        });
    }
}
exports.default = TheaterService;
