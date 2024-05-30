import router from "./router";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
