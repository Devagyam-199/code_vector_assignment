import pool from "../database/dbConn.js";
import paginationController from "../controllers/pagination.controller.js";

import { Router } from "express";
const paginationRouter = Router();

paginationRouter.get("/products", paginationController);

export default paginationRouter;
