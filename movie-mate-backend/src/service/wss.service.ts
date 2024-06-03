import { Server, WebSocket } from "ws";

class WebSocketService {
  private wss: Server;
  private clients: WebSocket[];

  constructor(server: any) {
    this.wss = new Server({ server });
    this.clients = [];

    console.log("ready")

    this.wss.on("connection", (ws) => {
      this.clients.push(ws);

      console.log({ ws });

      ws.on("close", () => {
        this.clients = this.clients.filter((client) => client !== ws);
      });
    });
  }

  public sendMessageToClients(message: string): void {
    console.log(this.clients);
    console.log({ message });
    this.clients.forEach((client) => {
      client.send(message);
    });
  }
}

export default WebSocketService;
