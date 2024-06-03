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
exports.deleteFavourite = exports.addFavourite = exports.movieDetail = exports.listAllMovie = void 0;
const service_1 = require("../service");
const movieService = new service_1.MovieService();
const authService = new service_1.AuthService();
const listAllMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cityId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.city_id;
        let { cookie } = req === null || req === void 0 ? void 0 : req.headers;
        let nim = null;
        if (cookie) {
            console.log({ cookie });
            cookie = decodeURIComponent((cookie === null || cookie === void 0 ? void 0 : cookie.split("igracias=")[1]) || "");
            const { nim: nimRes } = yield authService.detail({ cookie });
            nim = nimRes;
        }
        const allMovie = yield movieService.allMovie({ city_id: cityId, nim });
        return res.status(200).json({ data: allMovie });
    }
    catch (error) {
        console.log({ error });
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.listAllMovie = listAllMovie;
const addFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movie_id } = req === null || req === void 0 ? void 0 : req.params;
        let { cookie } = req === null || req === void 0 ? void 0 : req.headers;
        cookie = decodeURIComponent((cookie === null || cookie === void 0 ? void 0 : cookie.split("igracias=")[1]) || "");
        const { nim } = yield authService.detail({ cookie });
        if (!nim)
            throw new Error("Harap login");
        yield movieService.addFavourite({ movie_id, nim });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.addFavourite = addFavourite;
const deleteFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movie_id } = req === null || req === void 0 ? void 0 : req.params;
        let { cookie } = req === null || req === void 0 ? void 0 : req.headers;
        cookie = decodeURIComponent((cookie === null || cookie === void 0 ? void 0 : cookie.split("igracias=")[1]) || "");
        const { nim } = yield authService.detail({ cookie });
        if (!nim)
            throw new Error("Harap login");
        yield movieService.deleteFavourite({ movie_id, nim });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.deleteFavourite = deleteFavourite;
const movieDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movie_id } = req === null || req === void 0 ? void 0 : req.params;
        let { cookie } = req === null || req === void 0 ? void 0 : req.headers;
        let nim = null;
        if (cookie) {
            console.log({ cookie });
            cookie = decodeURIComponent((cookie === null || cookie === void 0 ? void 0 : cookie.split("igracias=")[1]) || "");
            const { nim: nimRes } = yield authService.detail({ cookie });
            nim = nimRes;
        }
        const movie = yield movieService.movieById({ movie_id, nim });
        return res.status(200).json({ data: movie });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.movieDetail = movieDetail;
