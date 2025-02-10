import doctorModel from "../modals/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export { changeAvailability, doctorList, loginDoctor };
