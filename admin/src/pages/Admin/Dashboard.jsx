import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "./../../context/AdminContext";
import { MdFreeCancellation } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, dashData, getDashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
        <div className="dash-card">
          <img src={assets.doctor_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">{dashData.doctors}</h2>
            <p className="text-slate-500">Doctors</p>
          </div>
        </div>
        <div className="dash-card">
          <img src={assets.appointments_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">{dashData.appointments}</h2>
            <p className="text-slate-500">Appointment</p>
          </div>
        </div>
        <div className="dash-card">
          <img src={assets.patients_icon} alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl">{dashData.patients}</h2>
            <p className="text-slate-500">Patients</p>
          </div>
        </div>
      </div>{" "}
      <div className="grow flex flex-col bg-white rounded-xl divide-y-1 divide-gray-300 border border-gray-300 ">
        <div className="flex px-8 py-4 items-center gap-3">
          <img src={assets.list_icon} className="w-5 h-5" />
          <h2 className="text-lg sm:text-xl">Latest Appointment</h2>
        </div>
        {dashData.latestAppointments &&
          dashData.latestAppointments.map((item, index) => (
            <div key={index} className="px-8 py-4 hover:bg-primary/5">
              <div className="flex gap-4 items-center">
                <img src={item.docData.image} className="w-12 h-12"></img>
                <div className="grow">
                  <h3 className="text-md sm:text-lg">{item.docData.name}</h3>
                  <p className="text-sm sm:text-md text-gray-500">
                    Booking on{" "}
                    {slotDateFormat(item.slotDate) + " - " + item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <div className="py-3 px-1 w-[30px] rounded-full h-[30px] flex items-center justify-center hover:shadow hover:scale-101 bg-primary/10 cursor-pointer mr-3">
                    <MdFreeCancellation
                      color=""
                      className="mx-auto h-[16px] w-[16px]"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => cancelAppointment(item._id)}
                    className="py-3 px-1 w-[30px] rounded-full h-[30px] flex items-center justify-center  bg-red-100  mr-3"
                  >
                    <RiDeleteBin6Line
                      color="red"
                      className="mx-auto h-[16px] w-[16px]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-4 px-4">
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
  );
};

export default Dashboard;
