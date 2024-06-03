"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const service_1 = require("./service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = http_1.default.createServer(app);
const webSocketService = new service_1.WebSocketService(server);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware untuk menonaktifkan caching
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});
// Middleware untuk menghapus header ETag
app.disable("etag");
app.use("/api", (0, router_1.default)(webSocketService));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
