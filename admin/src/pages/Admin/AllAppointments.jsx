import React from "react";
import { assets } from "./../../assets/assets";

const AllAppointments = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <h2 className="text-2xl">All Appointments</h2>
      <div className="flex flex-col grow bg-white max-w-7xl rounded-xl border border-gray-300 ">
        <header className="flex text-center grow justify-between border-b-1 border-gray-300">
          <p className="w-[3%] py-3 px-1 ">#</p>
          <p className="w-[20%] py-3 px-1">Patient</p>
          <p className="w-[15%] py-3 px-1">Department</p>
          <p className="w-[7%] py-3 px-1">Age</p>
          <p className="w-[20%] py-3 px-1">Date & Time</p>
          <p className="w-[20%] py-3 px-1">Doctor</p>
          <p className="w-[10%] py-3 px-1">Fees</p>
          <p className="w-[5%] py-3 px-1"></p>
        </header>
        <div>
          <div className="flex text-center grow justify-between border-gray-300 hover:bg-gray-50 items-center">
            <p className="w-[3%] py-3 px-1 ">#</p>
            <p className="w-[20%] py-3 px-1">Patient</p>
            <p className="w-[15%] py-3 px-1">Department</p>
            <p className="w-[7%] py-3 px-1">Age</p>
            <p className="w-[20%] py-3 px-1">Date & Time</p>
            <p className="w-[20%] py-3 px-1">Doctor</p>
            <p className="w-[10%] py-3 px-1">Fees</p>
            <div className="py-3 px-1 w-[5%] h-fit cursor-pointer">
              {" "}
              <img src={assets.cancel_icon} className="w-8 m-auto"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
