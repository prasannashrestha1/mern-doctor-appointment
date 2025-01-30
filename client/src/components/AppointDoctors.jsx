import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const AppointDoctors = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1440px] mt-4 mx-auto flex flex-col md:flex-row bg-primary w-full rounded-xl gap-3 md:gap-4 pt-6 px-6 md:px-10 lg:px-20">
      {/* left content */}
      <div className="flex flex-col items-center text-center md:text-start md:items-start justify-center grow gap-3 my-15 mx-6 sm:mx-14 md:mx-0 md:gap-4 text-white">
        <h1>Book Appointment with Trusted Doctors</h1>
        <button
          onClick={() => {
            navigate("/signin");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 bg-white w-fit text-gray-700 hover:text-black rounded-3xl px-6 py-2 m-auto md:m-0 hover:scale-105 transition ease-in-out duration-300"
        >
          Create Account
          <img src={assets.arrow_icon} className="w-3 h-3" />
        </button>
      </div>
      {/* right content */}
      <div className="hidden grow relative items-end justify-end md:flex">
        <img src={assets.appointment_img} className="w-full h-fit mt-1" />
      </div>
    </div>
  );
};

export default AppointDoctors;
