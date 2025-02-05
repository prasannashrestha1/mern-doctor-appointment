import express from "express";
import {
  addDoctor,
  adminLogin,
  fetchDoctors,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", authAdmin, fetchDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);

export default adminRouter;
