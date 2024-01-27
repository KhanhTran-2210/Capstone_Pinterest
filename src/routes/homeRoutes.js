import express from "express";
import { getlistPhoto } from "../controllers/homeController.js";





const homeRoutes = express();
homeRoutes.get("/getlistPhoto",getlistPhoto)





export default homeRoutes;