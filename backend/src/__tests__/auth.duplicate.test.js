import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
});

describe("Auth Duplicate User", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should reject duplicate email registration", async () => {
    const email = `test${Date.now()}@test.com`;

    await request(app).post("/api/auth/register").send({
      email,
      password: "Test123"
    });

    const res = await request(app).post("/api/auth/register").send({
      email,
      password: "Test123"
    });

    expect(res.statusCode).toBe(400);
  });

});