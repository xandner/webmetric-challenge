import { Request } from "express";
import rateLimit from "express-rate-limit";

export const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 1 minutes.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    return (req.headers["user_id"] as string) ?? req.ip;
  },
});
