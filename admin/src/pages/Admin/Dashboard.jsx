import React from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
        <div className="dash-card">
          <img src={assets.doctor_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">14</h2>
            <p className="text-slate-500">Doctors</p>
          </div>
        </div>
        <div className="dash-card">
          <img src={assets.appointments_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">14</h2>
            <p className="text-slate-500">Appointment</p>
          </div>
        </div>
        <div className="dash-card">
          <img src={assets.patients_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">5</h2>
            <p className="text-slate-500">Patients</p>
          </div>
        </div>
      </div>
      <div className="grow flex flex-col bg-white rounded-xl divide-y-1 divide-gray-300 border border-gray-300 ">
        <div className="flex px-8 py-4 items-center gap-3">
          <img src={assets.list_icon} className="w-5 h-5" />
          <h2 className="text-lg sm:text-xl">Latest Appointment</h2>
        </div>
        <div className="px-8 py-4">
          <div className="flex gap-4 items-center">
            <img src={assets.upload_area} className="w-12 h-12"></img>
            <div className="grow bg-red-50">
              <h3 className="text-md sm:text-lg">Dr. Richars James</h3>
              <p className="text-sm sm:text-md text-gray-500">
                Booking on 24th July, 2024
              </p>
            </div>
            <img
              src={assets.cancel_icon}
              className="w-12 h-12 cursor-pointer "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
