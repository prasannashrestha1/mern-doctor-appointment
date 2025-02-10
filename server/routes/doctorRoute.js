import express from "express";
import { doctorList, loginDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/list", doctorList);
router.post("/login", loginDoctor);

export default router;
