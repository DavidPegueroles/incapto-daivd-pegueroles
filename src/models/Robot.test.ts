import { Robot } from "./Robot";

describe("Given a Robot model", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  test("It should start at position 0:0:N when instantiated", () => {
    const expectedPosition = "0:0:N";

    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should be at position 0:1:N after moving forward from the initial position", () => {
    const expectedPosition = "0:1:N";

    robot.executeCommands("M");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should face West when the command to turn left is executed from North", () => {
    const expectedPosition = "0:0:W";

    robot.executeCommands("L");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should face East when the command to turn right is executed from North", () => {
    const expectedPosition = "0:0:E";

    robot.executeCommands("R");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should wrap to the opposite side when moving South from 0:0:S", () => {
    const expectedPosition = "0:9:S";

    robot.executeCommands("RRM");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should wrap to the opposite side when moving West from 0:0:W", () => {
    const expectedPosition = "9:0:W";

    robot.executeCommands("LM");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should be at position 2:2:E after moving forward twice both Nord and East from the initial position", () => {
    const expectedPosition = "2:2:E";

    robot.executeCommands("MRMLMRM");
    const currentPosition = robot.getStatus();

    expect(currentPosition).toBe(expectedPosition);
  });

  test("It should throw an error for an invalid command", () => {
    const invalidCommand = "X";

    expect(() => robot.executeCommands(invalidCommand)).toThrow(
      `Invalid command: ${invalidCommand}`,
    );
  });
});
