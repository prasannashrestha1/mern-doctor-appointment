import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { MdFreeCancellation } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="flex flex-col gap-8 max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
          <div className="dash-card">
            <img src={assets.earning_icon} alt="" />
            <div>
              <h2 className="text-xl sm:text-2xl">{dashData.earnings}</h2>
              <p className="text-slate-500">Earnings</p>
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
          {dashData.latestAppointments.length === 0 && (
            <div className="min-h-40 flex justify-center items-center text-slate-600 text-xl">
              No Appointments Available
            </div>
          )}
          {dashData.latestAppointments &&
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className="px-8 py-4 hover:bg-primary/5">
                <div className="flex gap-4 items-center  ">
                  <img
                    src={item.userData.image}
                    className="w-12 h-12 object-cover rounded-full border border-primary/10"
                  ></img>
                  <div className="grow">
                    <h3 className="text-md sm:text-lg">{item.userData.name}</h3>
                    <p className="text-sm sm:text-md text-gray-500">
                      Booking on{" "}
                      {slotDateFormat(item.slotDate) + " - " + item.slotTime}
                    </p>
                  </div>
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
    )
  );
};

export default DoctorDashboard;
