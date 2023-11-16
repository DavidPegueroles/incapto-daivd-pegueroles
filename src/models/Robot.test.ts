import { Robot } from "./Robot";

describe("Given a Robot model", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  test("Should start at position 0:0:N when instantiated", () => {
    expect(robot.getStatus()).toBe("0:0:N");
  });
});
