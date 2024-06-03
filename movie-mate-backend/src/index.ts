import router from "./router";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { WebSocketService } from "./service";

dotenv.config();

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const webSocketService = new WebSocketService(server);

app.use(cors());
app.use(express.json());

// Middleware untuk menonaktifkan caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Middleware untuk menghapus header ETag
app.disable("etag");

app.use("/api", router(webSocketService));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
