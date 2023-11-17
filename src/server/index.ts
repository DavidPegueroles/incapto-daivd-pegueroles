import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig";
import robotRouter from "./routers/robotRouter";

const app = express();

app.use(express.json());

app.use("/robot", robotRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
