import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
});

describe("Flight Search Validation", () => {

  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const email = `test${Date.now()}@test.com`;

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email,
        password: "Test123"
      });

    token = res.body.token;
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should return 400 for invalid input", async () => {
    const res = await request(app)
      .post("/api/flights/search")
      .set("Authorization", `Bearer ${token}`)
      .send({
        originCode: "",
        destinationCode: "",
        departureDate: "",
        returnDate: "",
        adults: 0
      });

    expect(res.statusCode).toBe(400);
  });

});