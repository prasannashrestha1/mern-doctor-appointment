import express from "express";
import authDoctor from "./../middlewares/authDoctor.js";

import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/list", doctorList);
router.post("/login", loginDoctor);
router.get("/doctor-appointments", authDoctor, appointmentsDoctor);
router.post("/complete-appointment", authDoctor, appointmentComplete);
router.post("/cancel-appointment", authDoctor, appointmentCancel);
router.get("/dashboard", authDoctor, doctorDashboard);
router.get("/profile", authDoctor, doctorProfile);
router.post("/update-profile", authDoctor, updateDoctor);

export default router;
