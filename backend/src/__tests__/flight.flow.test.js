import request from "supertest";
import app from "../app.js";

describe("Flight Search Flow", () => {

  test("should accept valid structured input and respond", async () => {
    const res = await request(app)
      .post("/api/flights/search")
      .send({
        originCode: "ATL",
        destinationCode: "JFK",
        departureDate: "2026-05-01",
        returnDate: "2026-05-05",
        adults: 2
      });

    expect(res.statusCode).not.toBe(500);
  });

});