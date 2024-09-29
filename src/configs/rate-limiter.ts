import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 100,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});
