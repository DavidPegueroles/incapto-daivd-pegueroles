import { Request, Response } from "express";
import { moveRobot } from "./robotController";

const mockExecuteCommands = jest.fn();
const mockGetStatus = jest.fn();

jest.mock("../../models/Robot", () => {
  return {
    Robot: jest.fn().mockImplementation(() => ({
      executeCommands: mockExecuteCommands,
      getStatus: mockGetStatus,
    })),
  };
});

describe("RobotController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockSend: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockExecuteCommands.mockClear();
    mockGetStatus.mockClear();

    mockSend = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockSend });

    mockResponse = { status: mockStatus } as Partial<Response>;
    mockRequest = { body: { commands: "M" } } as Partial<Request>;
  });

  test("moveRobot should send the correct status when valid commands are provided", () => {
    mockGetStatus.mockReturnValue("0:1:N");
    moveRobot(mockRequest as Request, mockResponse as Response);

    expect(mockExecuteCommands).toHaveBeenCalledWith("M");
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith({ status: "0:1:N" });
  });

  test("moveRobot should send an error message when 'commands' is not a string", () => {
    mockRequest.body.commands = 123;
    moveRobot(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockSend).toHaveBeenCalledWith({
      error: "Incorrect type of commands: number. Must be an string",
    });
  });

  test("moveRobot should send a 400 status code when an error occurs", () => {
    mockExecuteCommands.mockImplementation(() => {
      throw new Error("Invalid command");
    });

    mockRequest.body.commands = "X";
    moveRobot(mockRequest as Request, mockResponse as Response);

    expect(mockExecuteCommands).toHaveBeenCalledWith("X");
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockSend).toHaveBeenCalledWith({ error: "Invalid command" });
  });

  test("moveRobot should send an 'Unknown error' message when an unexpected error type is thrown", () => {
    mockExecuteCommands.mockImplementation(() => {
      throw "Some string error";
    });

    mockRequest.body.commands = "X";
    moveRobot(mockRequest as Request, mockResponse as Response);

    expect(mockExecuteCommands).toHaveBeenCalledWith("X");
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockSend).toHaveBeenCalledWith({ error: "Unknown error" });
  });
});
