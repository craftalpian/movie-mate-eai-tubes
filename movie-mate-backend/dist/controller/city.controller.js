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
exports.listAllCity = void 0;
const service_1 = require("../service");
const cityService = new service_1.CityService();
const listAllCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCity = yield cityService.allCity();
        return res.json({ data: allCity });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.listAllCity = listAllCity;
