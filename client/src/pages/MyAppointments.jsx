import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { allAppointments, retrieveAppointments, token } =
    useContext(AppContext);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        retrieveAppointments();
        console.log("done");
      } else {
        toast.error(data.message);
        console.log("error");
      }
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  return (
    <div className="pt-2 min-h-[80vh]">
      <h2 className="text-2xl font-semibold mb-5 pb-5 border-b border-gray-400">
        My Appointments
      </h2>
      <div className="grid grid-cols-1 gap-4 pt-5 max-h-[75vh] overflow-y-auto">
        {allAppointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 md:flex-row justify-between bg-gray-50 w-full rounded-xl py-3 px-4 sm:py-6 sm:px-8 border border-slate-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 ">
              <div className="bg-primary sm:max-w-50 flex items-end h-fit rounded-xl justify-center border-2 border-slate-300">
                <img src={item.docData.image} />
              </div>
              <div className="px-4 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl">{item.docData.name}</h2>
                  <p>{item.speciality}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-slate-800 font-semibold">Address:</p>
                  <p>{item.docData.address}</p>
                </div>
                <div className="flex gap-2 h-fit">
                  <span className="font-semibold">Date & Time:</span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </div>
              </div>
            </div>
            {!item.cancelled ? (
              <div className="flex flex-col justify-end gap-4 ">
                <button className="btn bg-blue-500 text-white">Pay</button>
                <button
                  onClick={() => {
                    cancelAppointment(item._id);
                  }}
                  className=" btn-failure "
                >
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-end gap-4 ">
                <button className=" text-red-500 ">
                  Appointment cancelled
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
