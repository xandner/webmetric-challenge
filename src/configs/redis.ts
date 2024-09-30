import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

let redisClient: RedisClientType;

redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.connect().then(()=>{
  console.log("Redis connected successfully");
}).catch((error) => {
  throw new Error("Error connecting to Redis, " + error);
});
  export default redisClient;
