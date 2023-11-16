import request from "supertest";
import app from "../.";

describe("Given a /robot/move endpoint", () => {
  it("It should move the robot and return the new status", async () => {
    const response = await request(app)
      .post("/robot/move")
      .send({ commands: "M" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({ status: "0:1:N" });
  });

  it("It should return an error for invalid commands", async () => {
    const response = await request(app)
      .post("/robot/move")
      .send({ commands: "X" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
