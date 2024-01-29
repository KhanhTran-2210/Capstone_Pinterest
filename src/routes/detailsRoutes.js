import express from "express";
import {
  createComment,
  getCommentById,
  getInfoById,
  getPhotoSaved,
} from "../controllers/detailsController.js";

import { khoaApi } from "../config/jwt.js";

const detailsRoutes = express();
detailsRoutes.get("/get-info/:photoId", getInfoById);
detailsRoutes.get("/get-comment/:photoId", getCommentById);
detailsRoutes.get("/get-photo-save/:photoId", khoaApi, getPhotoSaved);
detailsRoutes.post("/create-comment", khoaApi, createComment);

export default detailsRoutes;
