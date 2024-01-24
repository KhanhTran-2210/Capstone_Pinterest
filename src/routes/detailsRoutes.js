import express from "express";
import { createComment } from "../controllers/detailsController.js";
import { checkToken, khoaApi } from "../config/jwt.js";

const detailsRoutes = express();

detailsRoutes.post("/create-comment", khoaApi, createComment);
export default detailsRoutes;
