import express from "express";
import authRoutes from "./authRoutes.js";
import detailsRoutes from "./detailsRoutes.js";
import photoRoutes from "./photoRoutes.js";
import userRoutes from "./userRoutes.js";
import homeRoutes from "./homeRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/user", userRoutes);
rootRoutes.use("/details", detailsRoutes);
rootRoutes.use("/photo", photoRoutes);
rootRoutes.use("/home", homeRoutes);


export default rootRoutes;
