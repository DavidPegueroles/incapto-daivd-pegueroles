import { Request, Response } from "express";
import { Robot } from "../../models/Robot";

export const moveRobot = (req: Request, res: Response): void => {
  const robot: Robot = new Robot();

  try {
    const commands: string = req.body.commands;

    robot.executeCommands(commands);
    const status: string = robot.getStatus();

    res.status(200).json({ status });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
