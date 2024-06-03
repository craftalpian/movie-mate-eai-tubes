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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const js_base64_1 = require("js-base64");
class AuthService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
        this.headers = {
            Host: "igracias.telkomuniversity.ac.id",
            // "Cache-Control": "max-age=0",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "Upgrade-Insecure-Requests": "1",
            Origin: "https://igracias.telkomuniversity.ac.id",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            Referer: "https://igracias.telkomuniversity.ac.id/",
            "Accept-Language": "en-US,en;q=0.9",
        };
    }
    detail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ cookie }) {
            var _b;
            const igraciasUser = yield this.prismaClient.igracias.findFirst({
                where: {
                    cookie,
                },
                select: {
                    client_id: true,
                    nim: true,
                },
            });
            if (!igraciasUser)
                throw new Error("Akun tidak ditemukan");
            const { nim } = igraciasUser;
            let cookieNew = (0, js_base64_1.decode)(cookie);
            const { data: userData } = yield axios_1.default.get("https://igracias.telkomuniversity.ac.id/index.php?pageid=2941", {
                headers: Object.assign({ Cookie: `${cookieNew}` }, this.headers),
            });
            const fullName = userData
                .split('<h5 class="centered" style="margin-bottom:5px !important;">')[1]
                .split("</h5>")[0]
                .replace("\r\n", "")
                .trim();
            const email = userData
                .split("Email Anda</b></span>")[1]
                .split("</span>")[0]
                .split(">")[1]
                .trim();
            const imageUrl = (_b = userData
                .split('<img class="" src="')[1]
                .split('"')[0]) === null || _b === void 0 ? void 0 : _b.trim();
            yield this.prismaClient.igracias.update({
                data: {
                    email,
                    full_name: fullName,
                    image_url: imageUrl,
                },
                where: {
                    nim,
                },
            });
            return {
                full_name: fullName,
                email,
                image_url: imageUrl,
                nim,
                cookie,
            };
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ password, username, client_id, }) {
            var _b;
            const mainUrl = "https://igracias.telkomuniversity.ac.id/";
            const { headers } = yield axios_1.default.get(mainUrl, {
                headers: this.headers,
            });
            const cookieString = (headers === null || headers === void 0 ? void 0 : headers["set-cookie"]) || [];
            const cookie = `${cookieString.join("; ")};`;
            if (!cookieString)
                throw new Error("Cookie tidak ditemukan");
            axios_1.default.post(mainUrl, new URLSearchParams({
                textUsername: username,
                textPassword: password,
                submit: "Login",
            }), {
                headers: Object.assign({ cookie }, this.headers),
                validateStatus: function (status) {
                    return (status >= 200 && status < 300) || status === 500; // Menganggap status 500 sebagai sukses
                },
            });
            const { data: userData } = yield axios_1.default.get("https://igracias.telkomuniversity.ac.id/index.php?pageid=2941", {
                headers: Object.assign({ Cookie: `${cookie}` }, this.headers),
            });
            const $ = (0, cheerio_1.load)(userData);
            const nim = $("title").text().split("\n")[1].split(" ")[0];
            if (nim === "i-GRACIAS")
                throw new Error("Gagal masuk");
            const fullName = userData
                .split('<h5 class="centered" style="margin-bottom:5px !important;">')[1]
                .split("</h5>")[0]
                .replace("\r\n", "")
                .trim();
            const email = userData
                .split("Email Anda</b></span>")[1]
                .split("</span>")[0]
                .split(">")[1]
                .trim();
            const imageUrl = (_b = userData
                .split('<img class="" src="')[1]
                .split('"')[0]) === null || _b === void 0 ? void 0 : _b.trim();
            yield this.prismaClient.igracias.upsert({
                create: {
                    client_id,
                    cookie: (0, js_base64_1.encode)(cookie),
                    email,
                    full_name: fullName,
                    image_url: imageUrl,
                    nim,
                },
                update: {
                    client_id,
                    cookie: (0, js_base64_1.encode)(cookie),
                    email,
                    full_name: fullName,
                    image_url: imageUrl,
                },
                where: {
                    nim,
                },
            });
            return {
                full_name: fullName,
                email,
                nim,
                image_url: imageUrl,
                cookie: (0, js_base64_1.encode)(cookie),
            };
        });
    }
}
exports.default = AuthService;
