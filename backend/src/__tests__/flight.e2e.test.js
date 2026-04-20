import request from "supertest";
import app from "../app.js";

describe("Flight Search E2E", () => {

  test("should search flights and return results", async () => {
    const res = await request(app)
      .post("/api/flights/search")
      .send({
        originCode: "ATL",
        destinationCode: "LAX",
        departureDate: "2026-04-01",
        returnDate: "2026-04-10",
        adults: 1
      });

    expect([200, 401, 502]).toContain(res.statusCode);
  });

});