import express from "express";
import {
  deleteImg,
  getCreatedImg,
  getSavedImgByUserId,
  getUser,
} from "../controllers/photoController.js";
import { khoaApi } from "../config/jwt.js";

const photoRoutes = express();

photoRoutes.get("/get-user/:userId", khoaApi, getUser);
photoRoutes.get("/saves/:userId", khoaApi, getSavedImgByUserId);
photoRoutes.get("/created/:userId", khoaApi, getCreatedImg);
photoRoutes.delete("/delete/:imgId", khoaApi, deleteImg);

export default photoRoutes;
