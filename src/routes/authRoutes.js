import express from "express";
import { signup } from "../controllers/authController.js";

const authRoutes = express();

authRoutes.post("/signup", signup);
export default authRoutes;
