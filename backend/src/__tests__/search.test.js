import request from "supertest";
import app from "../app.js";

describe("POST /api/search", () => {
  it("should return 400 for invalid id", async () => {
    const response = await request(app)
      .post("/api/search")
      .send({ attribute_ids: ["invalid-id"] });

    expect(response.statusCode).toBe(400);
  });
});