import request from "supertest";
import app from "../app.js";

describe("Auth Validation", () => {

  test("should reject weak password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: `test${Date.now()}@test.com`,
        password: "123"
      });

    expect(res.statusCode).toBe(400);
  });

});