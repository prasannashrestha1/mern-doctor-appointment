import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    },
    phone: {
      type: String,
      default: "0000000",
    },
    gender: {
      type: String,
      default: "Not Selected",
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModal = mongoose.models.user || mongoose.model("User", userSchema);

export default userModal;
