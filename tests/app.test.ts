import request from "supertest";
import app from "../src/app";

jest.mock("redis-mock", () => {
  const redisMock = require("redis-mock"); 
  return {
    createClient: () => redisMock.createClient(),
  };
});

describe("GET /data", () => {
  it("should return 200 and user data", async () => {
    const response = await request(app).get("/data").set({"user_id": "1"});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should return 404 if user is not found", async () => {
    const res = await request(app).get("/data").set({ user_id: "10" }); 

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });

  it("should return 429 if user sends too many requests", async () => {

    for (let i = 0; i < 10; i++) {
      await request(app).get("/data").set({ user_id: "1" });
    }
    const res = await request(app).get("/data").set({ user_id: "1" });

    expect(res.statusCode).toEqual(429);
  });

  it("should return 429 if someone send too many requests without user_id", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).get("/data");
    }
    const res = await request(app).get("/data");

    expect(res.statusCode).toEqual(429);
  })
});
