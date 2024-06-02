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
exports.login = void 0;
const service_1 = require("../service");
const authService = new service_1.AuthService();
const apiService = new service_1.ApiService();
// login igracias
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, client_id } = req === null || req === void 0 ? void 0 : req.body;
        const apiData = yield apiService.apiDetail(client_id);
        if (!apiData)
            throw new Error("client_id not found");
        const igraciasData = yield authService.login({
            username,
            password,
            client_id,
        });
        return res.status(200).json({
            data: Object.assign(Object.assign({}, igraciasData), { api_owner: (apiData === null || apiData === void 0 ? void 0 : apiData.owner_name) || "-" }),
            success: true,
            message: "Berhasil Masuk",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Bermasalah",
            success: false,
        });
    }
});
exports.login = login;
