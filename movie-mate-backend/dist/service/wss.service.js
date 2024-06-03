"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class WebSocketService {
    constructor(server) {
        this.wss = new ws_1.Server({ server });
        this.clients = [];
        console.log("ready");
        this.wss.on("connection", (ws) => {
            this.clients.push(ws);
            console.log({ ws });
            ws.on("close", () => {
                this.clients = this.clients.filter((client) => client !== ws);
            });
        });
    }
    sendMessageToClients(message) {
        console.log(this.clients);
        console.log({ message });
        this.clients.forEach((client) => {
            client.send(message);
        });
    }
}
exports.default = WebSocketService;
