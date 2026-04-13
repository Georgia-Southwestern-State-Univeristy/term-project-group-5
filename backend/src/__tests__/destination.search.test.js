import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv";
import path from "path";
import { jest } from "@jest/globals";


dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

jest.setTimeout(20000);

describe("Destination Search API", () => {
  let token;

  beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const email = `test${Date.now()}@test.com`;

  await request(app).post("/api/auth/register").send({
    email,
    password: "Test1234",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email,
    password: "Test1234",
  });

  token = loginRes.body.token || loginRes.body.data?.token;
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

  // ================================
  // 🔗 Integration
  // ================================
  describe("Integration", () => {
    test("should reject destination search without token", async () => {
      const res = await request(app)
        .post("/api/search")
        .send({ attribute_ids: ["507f1f77bcf86cd799439011"] });

      expect(res.statusCode).toBe(401);
    });

    test("should allow destination search with valid token", async () => {
      const res = await request(app)
        .post("/api/search")
        .set("Authorization", `Bearer ${token}`)
        .send({
          attribute_ids: ["507f1f77bcf86cd799439011"]
        });

      expect(res.statusCode).toBe(201); // ⭐ 注意这里
    });
  });

  // ================================
  // ⚠️ Validation
  // ================================
  describe("Validation", () => {
    test("should return 400 for empty attribute_ids", async () => {
      const res = await request(app)
        .post("/api/search")
        .set("Authorization", `Bearer ${token}`)
        .send({ attribute_ids: [] });

      expect(res.statusCode).toBe(400);
    });

    test("should return 400 for invalid ObjectId format", async () => {
      const res = await request(app)
        .post("/api/search")
        .set("Authorization", `Bearer ${token}`)
        .send({ attribute_ids: ["invalid-id"] });

      expect(res.statusCode).toBe(400);
    });
  });
});