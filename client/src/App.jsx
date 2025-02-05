import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className=" mx-4 sm:mx-8">
      <ToastContainer />
      <div className="flex flex-col gap-10 max-w-[1440px] mx-auto w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/doctor" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctor/:speciality" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
