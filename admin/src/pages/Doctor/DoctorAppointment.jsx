import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { MdFreeCancellation } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import { FaCalendarCheck, FaCheck } from "react-icons/fa";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    fetchAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      fetchAppointments();
    }
  }, [dToken]);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-4">
        {" "}
        <h2 className="text-2xl">All Appointments</h2>
        <div className="flex gap-4 ">
          <div className="flex items-center text-primary gap-2">
            <MdFreeCancellation />
            <p>Cancelled</p>
          </div>
          <div className="flex items-center text-red-500 gap-2">
            <RiDeleteBin6Line />
            <p>cancel</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full  bg-white max-w-7xl rounded-xl border border-gray-300 ">
        <header className="flex text-center grow justify-between border-b-1 rounded-xl border-gray-300  ">
          <p className="w-[3%] py-3 px-1 ">#</p>
          <p className="w-[25%] py-3 px-1">Patient</p>
          <p className="w-[15%] py-3 px-1">Payment</p>
          <p className="w-[7%] py-3 px-1">Age</p>
          <p className="w-[20%] py-3 px-1">Date & Time</p>
          <p className="w-[20%] py-3 px-1">Fees</p>
          <p className="y-3 px-1 w-[10%] rounded-full h-[30px] flex items-center justify-center cursor-pointer mr-3"></p>
        </header>
        <div className="">
          {appointments.length === 0 && (
            <div className="min-h-40 flex justify-center items-center text-slate-600 text-xl">
              No Appointments Available
            </div>
          )}
          {appointments &&
            appointments.map((item, index) => (
              <div
                key={item._id}
                className="flex text-center grow justify-between border-gray-300 hover:bg-gray-50 items-center"
              >
                <p className="w-[3%] py-3 px-1 ">{index + 1}</p>
                <p className="w-[25%] py-3 px-1">{item.userData.name}</p>
                <p className="w-[15%] py-3 px-1">
                  {item.payment ? "online" : "cash"}
                </p>
                <p className="w-[7%] py-3 px-1">
                  {new Date().getFullYear() - item.userData.dob.split("-")[0]}
                </p>
                <p className="w-[20%] py-3 px-1">
                  {slotDateFormat(item.slotDate) + " | " + item.slotTime}
                </p>
                <p className="w-[20%] py-3 px-1">{item.amount}</p>
                <div className="w-[10%] flex gap-1 items-end">
                  {item.cancelled ? (
                    <div className="px-4 py-2 rounded-full  bg-red-100">
                      <p className=" text-red-500 text-xs font-medium">
                        Cancelled
                      </p>
                    </div>
                  ) : item.isCompleted ? (
                    <div className="px-4 py-2 rounded-full  bg-green-100">
                      <p className=" text-green-500 text-xs font-medium">
                        Completed
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <div
                        onClick={() => cancelAppointment(item._id)}
                        className="py-3 px-1 w-[30px] cursor-pointer rounded-full h-[30px] flex items-center justify-center hover:shadow hover:scale-101 bg-red-100  mr-3"
                      >
                        <RiDeleteBin6Line
                          color="red"
                          className="mx-auto h-[16px] w-[16px]"
                        />
                      </div>
                      <div
                        onClick={() => completeAppointment(item._id)}
                        className="py-3 px-1 w-[30px] cursor-pointer rounded-full h-[30px] flex items-center justify-center hover:shadow hover:scale-101 bg-green-100 hover:bg-green-200 mr-3"
                      >
                        <FaCheck
                          color="green"
                          className="mx-auto h-[16px] w-[16px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
