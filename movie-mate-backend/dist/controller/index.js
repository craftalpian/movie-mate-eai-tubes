"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theaterByCity = exports.listAllCity = exports.listAllMovie = void 0;
const movie_controller_1 = require("./movie.controller");
Object.defineProperty(exports, "listAllMovie", { enumerable: true, get: function () { return movie_controller_1.listAllMovie; } });
Object.defineProperty(exports, "theaterByCity", { enumerable: true, get: function () { return movie_controller_1.theaterByCity; } });
const city_controller_1 = require("./city.controller");
Object.defineProperty(exports, "listAllCity", { enumerable: true, get: function () { return city_controller_1.listAllCity; } });
