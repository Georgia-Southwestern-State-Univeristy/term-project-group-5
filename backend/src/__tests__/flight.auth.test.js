import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { jest } from "@jest/globals";

import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";




import axios from "axios";


axios.request = jest.fn().mockResolvedValue({
  data: {
    data: {
      itineraries: []
    }
  }
});
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

/*test("should reject flight search without token", async () => {
  const res = await request(app)
    .post("/api/flights/search")
    .send({
      originCode: "ATL",
      destinationCode: "LAX",
      departureDate: "2026-04-01",
      adults: 1
    });
   console.log(res.body); 
  expect(res.statusCode).toBe(401);
});
*/

test("should allow flight search with valid token", async () => {
 
  const email = `test${Date.now()}@test.com`;

  await request(app).post("/api/auth/register").send({
    email,
    password: "Test1234"
  });

 
  const loginRes = await request(app).post("/api/auth/login").send({
    email,
    password: "Test1234"
  });
  const token = loginRes.body.data?.token || loginRes.body.token;
  console.log("HEADER:", `Bearer ${token}`);

  const res = await request(app)
    .post("/api/flights/search")
    .set("Authorization", `Bearer ${token}`)
    .send({
  originCode: "ATL",
  destinationCode: "LAX",
  departureDate: "2026-04-01",
  returnDate: "2026-04-05", 
  adults: 1
});

  expect(res.statusCode).toBe(200);
});