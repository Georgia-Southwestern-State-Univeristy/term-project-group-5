import request from "supertest";
import app from "../app.js";

describe.skip("Destination Search API - Validation", () => {
  it("should return 400 for invalid id", async () => {
    const email = `test${Date.now()}@test.com`;

    
    await request(app).post("/api/auth/register").send({
      email,
      password: "Test1234"
    });

   
    const loginRes = await request(app).post("/api/auth/login").send({
      email,
      password: "Test1234"
    });

    const token = loginRes.body.token || loginRes.body.data?.token;

    const response = await request(app)
      .post("/api/search")
      .set("Authorization", `Bearer ${token}`) 
      .send({ attribute_ids: ["invalid-id"] });

    expect(response.statusCode).toBe(400);
  });
});