import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { limiter } from "./configs/rate-limiter";
import { redisClient } from "./configs/redis";
import { mockData } from "./mocks/db";


const app: Express = express();
const port = process.env.PORT || 3000;
redisClient.connect();

app.use(limiter);

app.get("/", async (req: Request, res: Response) => {
  const userId = req.headers["user_id"] as string;
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
