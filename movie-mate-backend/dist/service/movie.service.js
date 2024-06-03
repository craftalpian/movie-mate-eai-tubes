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
class MovieService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    allMovie(_a) {
        return __awaiter(this, arguments, void 0, function* ({ city_id, nim }) {
            var _b;
            let data;
            if (city_id) {
                data = yield this.prismaClient
                    .$queryRaw `select distinct movie.movie_id movie_id, movie.type type, movie.title title, movie.image_url image_url, movie.synopsis synopsis, movie.cast cast from movie join movie_theater on movie_theater.movie_id = movie.movie_id join schedule on schedule.movie_theater_id = movie_theater.movie_theater_id join theater on theater.theater_id = movie_theater.theater_id where theater.city_id = ${city_id};`;
            }
            else {
                data = yield this.prismaClient.movie.findMany({
                    select: {
                        title: true,
                        image_url: true,
                        synopsis: true,
                        cast: true,
                        movie_id: true,
                        type: true,
                    },
                });
            }
            const combineWithFavourite = yield Promise.all((_b = (data || [])) === null || _b === void 0 ? void 0 : _b.map((movie) => __awaiter(this, void 0, void 0, function* () {
                const totalFavourite = yield this.prismaClient.favourite.count({
                    where: {
                        movie_id: movie === null || movie === void 0 ? void 0 : movie.movie_id,
                    },
                });
                let favouriteByMe = 0;
                if (nim) {
                    favouriteByMe = yield this.prismaClient.favourite.count({
                        where: {
                            movie_id: movie === null || movie === void 0 ? void 0 : movie.movie_id,
                            nim,
                        },
                    });
                }
                return Object.assign(Object.assign({}, movie), { total_favourite: totalFavourite, favourite_by_me: favouriteByMe > 0 });
            })));
            return combineWithFavourite;
        });
    }
    deleteFavourite(_a) {
        return __awaiter(this, arguments, void 0, function* ({ movie_id, nim }) {
            const favourite = yield this.prismaClient.favourite.findFirst({
                where: {
                    movie_id,
                    nim,
                },
            });
            if (favourite) {
                yield this.prismaClient.favourite.delete({
                    where: {
                        favourite_id: favourite === null || favourite === void 0 ? void 0 : favourite.favourite_id,
                    },
                });
                return true;
            }
            return false;
        });
    }
    addFavourite(_a) {
        return __awaiter(this, arguments, void 0, function* ({ movie_id, nim }) {
            const countFavourite = yield this.prismaClient.favourite.count({
                where: {
                    movie_id,
                    nim,
                },
            });
            if (countFavourite < 1) {
                yield this.prismaClient.favourite.create({
                    data: {
                        favourite_id: (0, utils_1.id)("fav"),
                        movie_id,
                        nim,
                    },
                });
                return true;
            }
            return false;
        });
    }
    movieById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ movie_id, nim }) {
            const movie = yield this.prismaClient.movie.findFirst({
                where: {
                    movie_id,
                },
                select: {
                    cast: true,
                    category: true,
                    category_url: true,
                    director: true,
                    image_url: true,
                    title: true,
                    synopsis: true,
                    minute: true,
                    producer: true,
                    writer: true,
                    movie_id: true,
                    production: true,
                },
            });
            const totalFavourite = yield this.prismaClient.favourite.count({
                where: {
                    movie_id,
                },
            });
            let favouriteByMe = 0;
            if (nim) {
                favouriteByMe = yield this.prismaClient.favourite.count({
                    where: {
                        movie_id: movie === null || movie === void 0 ? void 0 : movie.movie_id,
                        nim,
                    },
                });
            }
            return Object.assign(Object.assign({}, movie), { total_favourite: totalFavourite, favourite_by_me: favouriteByMe > 0 });
            return Object.assign({}, movie);
        });
    }
    theaterByCity(city_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const theaters = yield this.prismaClient.theater.findMany({
                select: {
                    theater_id: true,
                    name: true,
                    address: true,
                },
                where: {
                    city_id,
                },
            });
            console.log({ theaters });
            const theaterIds = theaters === null || theaters === void 0 ? void 0 : theaters.map(({ theater_id }) => theater_id);
            console.log({ theaterIds });
            const movieTheater = yield this.prismaClient.movie_theater.findMany({
                select: {
                    movie_id: true,
                    movie_theater_id: true,
                    weekday_price: true,
                    weekend_price: true,
                    theater_id: true,
                },
                where: {
                    theater_id: {
                        in: theaterIds,
                    },
                },
            });
            console.log({ movieTheater });
            let movieIds = movieTheater === null || movieTheater === void 0 ? void 0 : movieTheater.map(({ movie_id }) => movie_id);
            movieIds = [...new Set(movieIds)];
            const dateToSearch = new Date("2023-05-30"); // Ganti dengan tanggal yang Anda inginkan
            const startOfDay = new Date(dateToSearch);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(dateToSearch);
            endOfDay.setUTCHours(23, 59, 59, 999);
            const schedule = yield this.prismaClient.schedule.findMany({
                select: {
                    movie_theater_id: true,
                    schedule_id: true,
                    start_timestamp: true,
                },
                where: {
                    movie_theater_id: {
                        in: movieTheater === null || movieTheater === void 0 ? void 0 : movieTheater.map(({ movie_theater_id }) => movie_theater_id),
                    },
                    // start_timestamp: {
                    //   gte: startOfDay,
                    //   lte: endOfDay,
                    // },
                },
            });
            console.log({ schedule });
            // await this.prismaClient.
        });
    }
}
exports.default = MovieService;
