import express from "express";
import { updateUser } from "../controllers/userControllers.js";

const userRoutes = express();

userRoutes.put("/update/:userId", updateUser);
export default userRoutes;
