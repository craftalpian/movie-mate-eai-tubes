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
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
const cheerio_1 = require("cheerio");
const js_base64_1 = require("js-base64");
class AuthService {
    constructor() {
        this.jar = new tough_cookie_1.CookieJar();
        this.axiosClient = (0, axios_cookiejar_support_1.wrapper)(axios_1.default.create({ jar: this.jar }));
        this.prismaClient = new client_1.PrismaClient();
        this.headers = {
            Host: "igracias.telkomuniversity.ac.id",
            "Cache-Control": "max-age=0",
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
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ password, username, client_id, }) {
            var _b, _c;
            const mainUrl = "https://igracias.telkomuniversity.ac.id/";
            yield this.axiosClient.get(mainUrl, {
                headers: this.headers,
            });
            const cookieString = yield ((_b = this.jar) === null || _b === void 0 ? void 0 : _b.getSetCookieStrings(mainUrl));
            const cookie = `${cookieString.join("; ")};`;
            if (!cookieString)
                throw new Error("Cookie tidak ditemukan");
            const { data } = yield axios_1.default.post(mainUrl, new URLSearchParams({
                textUsername: username,
                textPassword: password,
                submit: "Login",
            }), {
                headers: Object.assign({ Cookie: `${cookie}` }, this.headers),
            });
            const $ = (0, cheerio_1.load)(data);
            const nim = $("title").text().split("\n")[1].split(" ")[0];
            if (nim === "i-GRACIAS")
                throw new Error("Gagal masuk");
            const { data: userData } = yield axios_1.default.get("https://igracias.telkomuniversity.ac.id/index.php?pageid=2941", {
                headers: Object.assign({ Cookie: `${cookie}` }, this.headers),
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
            const imageUrl = (_c = userData
                .split('<img class="" src="')[1]
                .split('"')[0]) === null || _c === void 0 ? void 0 : _c.trim();
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
                cookie: (0, js_base64_1.encode)(cookie),
            };
        });
    }
}
exports.default = AuthService;
