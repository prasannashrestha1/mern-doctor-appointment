import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Doctor from "./pages/Doctor";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <div className="flex flex-col gap-10 mx-4 sm:mx-8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor/:speciality" element={<Doctor />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/appointment" element={<MyAppointments />} />
        <Route path="/appointment/:docID" element={<Appointment />} />
      </Routes>
    </div>
  );
};

export default App;
