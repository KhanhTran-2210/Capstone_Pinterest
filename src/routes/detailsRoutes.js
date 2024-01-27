import express from "express";
import { createComment, getCommentById, getInfoById, getPhotoSaved } from "../controllers/detailsController.js";

import { checkToken, khoaApi } from "../config/jwt.js";

const detailsRoutes = express();
detailsRoutes.get("/getInfo/:photoId" ,getInfoById)
detailsRoutes.get("/getComment/:photoId",getCommentById)
detailsRoutes.get("/getPhotoSaved/:photoId",getPhotoSaved)
detailsRoutes.post("/create-comment", khoaApi, createComment);

export default detailsRoutes;
