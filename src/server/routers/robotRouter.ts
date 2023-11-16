import express from "express";
import { moveRobot } from "../controllers/robotController";

const robotRouter = express.Router();

robotRouter.post("/move", moveRobot);

export default robotRouter;
