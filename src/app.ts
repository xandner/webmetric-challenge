import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { userLimiter } from "./configs/rate-limiter";
import redisClient from "./configs/redis";
import { mockData } from "./mocks/db";

const app: Express = express();

app.use(morgan("[ :method ] :url :status - :response-time ms"));
app.use(userLimiter);

app.get("/data", async (req: Request, res: Response) => {
  const userId = (req.headers["user_id"] as string) || "0";
  const cachedData = await redisClient.get(userId);
  if (cachedData) res.status(200).json(JSON.parse(cachedData));
  else {
    const user = mockData.find((user) => user.id === Number(userId));
    if (user) {
      await redisClient.set(userId, JSON.stringify(user));
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

export default app;
