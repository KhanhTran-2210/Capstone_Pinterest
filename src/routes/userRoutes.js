import express from "express";
import { updateUser, uploadMulterImg } from "../controllers/userControllers.js";
import { khoaApi } from "../config/jwt.js";
import uploadCloud from "../config/cloudinary.config.js";

const userRoutes = express();

userRoutes.put("/update/:userId", khoaApi, updateUser);
userRoutes.post(
  "/upload-img",
  khoaApi,
  uploadCloud.array("files"),
  uploadMulterImg
);
export default userRoutes;
