import doctorModel from "../modals/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "./../modals/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const user = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, { available: !user.available });
    res.status(200).json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.log(error);
  }
};

const doctorList = async (req, res) => {
  try {
    const allDoctors = await doctorModel
      .find({})
      .select(["-password", "-email"]);
    res.status(200).json({
      success: true,
      allDoctors,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validDoctor = await doctorModel.findOne({ email });
    if (!validDoctor) {
      return res.json({
        success: false,
        message: "No User found",
      });
    }
    const verifyPassword = await bcrypt.compare(password, validDoctor.password);
    if (!verifyPassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    } else {
      const token = jwt.sign({ id: validDoctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to mark appointment completed.
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment has been completed",
      });
    } else {
      res.json({
        success: false,
        message: "Mark Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to cancel appointment .
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment has been cancelled",
      });
    } else {
      res.json({
        success: false,
        message: "Cancellation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
};
