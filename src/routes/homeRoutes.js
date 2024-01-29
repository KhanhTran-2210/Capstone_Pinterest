import express from "express";
import { getListByName, getlistPhoto } from "../controllers/homeController.js";

const homeRoutes = express();
homeRoutes.get("/get-list-photo", getlistPhoto);
homeRoutes.get("/search", getListByName);

export default homeRoutes;
