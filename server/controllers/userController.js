import bcrypt from "bcrypt";
import userModal from "./../modals/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../modals/appointmentModel.js";
import doctorModel from "../modals/doctorModel.js";

//user signup

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }
    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "enter a strong password",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModal({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password should not be empty",
      });
    }
    const validUser = await userModal.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(password, validUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    } else {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//fetch current user profile
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModal.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update current user
export const updateUser = async (req, res) => {
  try {
    const { userId, name, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId || !name || !address || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please Fill in all credentials",
      });
    }
    await userModal.findByIdAndUpdate(userId, {
      name,
      address,
      dob,
      gender,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModal.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
      console.log(imageUrl);
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// api to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const doctor = await doctorModel.findById(docId).select("-password");
    console.log(docId);
    if (!doctor.available) {
      return res.json({
        success: false,
        message: "Doctor not available",
      });
    }

    let slots_booked = doctor.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: true,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    console.log(doctor);

    const user = await userModal.findById(userId).select("-password");

    delete doctor.slots_booked;

    const appointment = new appointmentModel({
      userId,
      docId,
      slotDate,
      slotTime,
      userData: user,
      docData: doctor,
      amount: doctor.fees,
    });
    await appointment.save();

    //save new slots data in docdata
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    console.log(error);
  }
};

//retreive current user appointments

export const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const allAppointments = await appointmentModel.find({ userId });
    res.json({
      success: true,
      allAppointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//cancel appointment

export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "User not authorized",
      });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot.
    const { slotDate, slotTime, docId } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
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
