import express from "express";
import robotRouter from "./routers/robotRouter";

const app = express();

app.use(express.json());

app.use("/robot", robotRouter);

export default app;
