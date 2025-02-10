import express from "express";
import {
  appointmentsDoctor,
  doctorList,
  loginDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/list", doctorList);
router.post("/login", loginDoctor);
router.get("/doctor-appointments", appointmentsDoctor);

export default router;
