import request from "supertest";
import app from "../app.js";

describe("Flight API Schema", () => {

  test("should return correct flight schema", async () => {
    const res = await request(app)
      .post("/api/flights/search")
      .send({
        originCode: "ATL",
        destinationCode: "LAX",
        departureDate: "2026-04-01",
        returnDate: "2026-04-10",
        adults: 1
      });

    if (res.statusCode === 200 && res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("price");
      expect(res.body[0]).toHaveProperty("itinerary");
    }
  });

});