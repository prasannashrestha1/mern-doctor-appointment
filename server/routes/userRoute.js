import express from "express";
import {
  getProfile,
  login,
  signup,
  updateUser,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-profile", authUser, getProfile);
router.post("/update-profile", upload.single("image"), authUser, updateUser);

export default router;
