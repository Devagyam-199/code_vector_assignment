import express from "express";
import cors from "cors";
import seedAll from "./utils/fakeInputGenerator.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_DEPLOYMENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

import paginationRouter from "./routes/pagination.routes.js";
app.use("/api/v1", paginationRouter);

export default app;
