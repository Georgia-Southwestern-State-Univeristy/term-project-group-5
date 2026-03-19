import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
});
process.env.JWT_SECRET = process.env.JWT_SECRET || "testsecret123";

describe("Auth API", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should register a new user", async () => {
    const email = `test${Date.now()}@test.com`;

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email,
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("should login successfully (authorized)", async () => {
    const email = `test${Date.now()}@test.com`;

    await request(app).post("/api/auth/register").send({
      email,
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should fail login (unauthorized)", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
  });

});