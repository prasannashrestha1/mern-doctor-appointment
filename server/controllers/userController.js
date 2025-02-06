//user signup
import bcrypt from "bcrypt";
import userModal from "./../modals/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

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
