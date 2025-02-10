import express from "express";
import {
  addDoctor,
  adminLogin,
  appointmentCancel,
  appointmentsAdmin,
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
adminRouter.get("/all-appointments", authAdmin, appointmentsAdmin);
adminRouter.put("/cancel-appointment", authAdmin, appointmentCancel);

export default adminRouter;
