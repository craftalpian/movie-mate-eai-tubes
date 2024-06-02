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
        return __awaiter(this, arguments, void 0, function* ({ city_id, movie_id, }) {
            return yield this.prismaClient
                .$queryRaw `select distinct theater_name, theater_id, weekday_price, weekend_price, movie_theater_id from daily_movie_schedule where city_id = ${city_id} and movie_id = ${movie_id};`;
        });
    }
}
exports.default = TheaterService;
