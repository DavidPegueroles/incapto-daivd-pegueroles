import express from "express";
import { moveRobot } from "../controllers/robotController";

const robotRouter = express.Router();

/**
 * @openapi
 * /robot/move:
 *   post:
 *     summary: Move the robot based on commands
 *     description: This endpoint moves the robot based on the provided commands.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commands:
 *                 type: string
 *                 description: The commands to move the robot.
 *                 example: "MMRMMRMRRM"
 *     responses:
 *       200:
 *         description: Returns the final position of the robot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "2:3:N"
 *       400:
 *         description: Bad request response for an invalid command.
 */
robotRouter.post("/move", moveRobot);

export default robotRouter;
