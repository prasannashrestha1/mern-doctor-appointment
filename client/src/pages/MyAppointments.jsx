import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="pt-2 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5 pb-5 border-b border-gray-400">
        My Appointments
      </h2>
      <div className="grid grid-cols-1 gap-4 pt-5">
        {doctors.slice(0, 1).map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 md:flex-row justify-between bg-gray-50 w-full rounded-xl py-3 px-4 sm:py-6 sm:px-8 border border-slate-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 ">
              <div className="bg-primary sm:max-w-50 flex items-end h-fit rounded-xl justify-center border-2 border-slate-300">
                <img src={item.image} />
              </div>
              <div className="px-4 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl">{item.name}</h2>
                  <p>{item.speciality}</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold">Address</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>
                <div className="flex h-fit">
                  <span className="font-semibold">Date & Time</span>
                  {item.date}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-4 ">
              <button className="btn bg-blue-500 text-white">Pay</button>
              <button className=" btn-failure ">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
