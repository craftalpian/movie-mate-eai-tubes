import type { CookieJar } from "tough-cookie";
import WebSocket from "ws";

declare module "axios" {
  interface AxiosRequestConfig {
    jar?: CookieJar;
  }
}

declare module "express" {
  interface Request {
    ws: WebSocket; // Menambahkan properti ws pada objek Request
  }
}
