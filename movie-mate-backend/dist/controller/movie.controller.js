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
exports.theaterByCity = exports.listAllMovie = void 0;
const service_1 = require("../service");
const movieService = new service_1.MovieService();
const listAllMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovie = yield movieService.allMovie();
        return res.json({ data: allMovie });
    }
    catch (error) { }
});
exports.listAllMovie = listAllMovie;
const theaterByCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTheaterByCity = yield movieService.theaterByCity("city_4ZZgO8GT0PmnV75ZLm5v");
        return res.json({ data: allTheaterByCity });
    }
    catch (error) { }
});
exports.theaterByCity = theaterByCity;
