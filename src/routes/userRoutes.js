import express from "express";
import { updateUser, uploadMulterImg } from "../controllers/userControllers.js";
import { khoaApi } from "../config/jwt.js";

import storage from "../controllers/uploadController.js";

const userRoutes = express();

userRoutes.put("/update/:userId", khoaApi, updateUser);
userRoutes.post(
  "/upload-img",
  // khoaApi,
  storage.single("file"),
  uploadMulterImg
);
export default userRoutes;
