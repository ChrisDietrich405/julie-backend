import express from "express";
import authRouter from "./routes/authRouter";
import orderRouter from "./routes/orderRouter";
import dotenv from "dotenv";
import "./config/db";

dotenv.config();

class App {
  app; //app is a variable and is also considered a field inside a class
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/orders", orderRouter);
  }

  middleware() {
    this.app.use(express.json());
  }
}

export default new App().app;
//this is when the App object will be created, and the app (which is an instantiation of express) is inside of that
