import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../modals/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../modals/appointmentModel.js";
import userModal from "./../modals/userModel.js";

const addDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "all fields are necessary" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: " Please input valid email" });
    }
    if (password.length < 7) {
      return res.json({
        success: false,
        message: "Password length should be greater than 7",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //upload image to cloudinnary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      image: imageUrl,
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.status(200).json({
      success: true,
      message: "New Doctor has been created successfully",
      newDoctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to get all doctors list for admin panel

const fetchDoctors = async (req, res) => {
  try {
    const allDoctors = await doctorModel.find().select("-password");
    res.json({
      success: true,
      allDoctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const allAppointments = await appointmentModel.find({});
    res.json({
      success: true,
      allAppointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api to cancel an appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    const model = await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Releasing doctor slot
    const { slotDate, slotTime, docId } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    let slots_booked = doctorData.slots_booked || {}; // Ensure it's an object
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//dashboard data
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModal.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 6),
    };
    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export {
  addDoctor,
  adminLogin,
  fetchDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
