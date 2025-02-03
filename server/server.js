import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("finish");
});

//api endpoints
app.use("/api/admin", adminRouter);

//starting the server
const startServer = () => {
  app.listen(port, console.log("Port listening to " + port));
};

connectDB().then(startServer());
connectCloudinary();
