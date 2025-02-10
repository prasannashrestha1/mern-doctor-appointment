import React, { useContext, useEffect } from "react";
import { assets } from "./../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import { MdFreeCancellation } from "react-icons/md";
const AllAppointments = () => {
  const { fetchAppoitnments, allAppointment, aToken, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      fetchAppoitnments();
    }
  }, [aToken, allAppointment]);

  console.log(allAppointment);

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
        <header className="flex text-center grow justify-between border-b-1 border-gray-300  ">
          <p className="w-[3%] py-3 px-1 ">#</p>
          <p className="w-[20%] py-3 px-1">Patient</p>
          <p className="w-[15%] py-3 px-1">Department</p>
          <p className="w-[7%] py-3 px-1">Age</p>
          <p className="w-[20%] py-3 px-1">Date & Time</p>
          <p className="w-[20%] py-3 px-1">Doctor</p>
          <p className="w-[10%] py-3 px-1">Fees</p>
          <p className="py-3 px-1 w-[30px] rounded-full h-[30px] flex items-center justify-center cursor-pointer mr-3"></p>
        </header>
        <div className="">
          {allAppointment &&
            allAppointment.map((item, index) => (
              <div
                key={item._id}
                className="flex text-center grow justify-between border-gray-300 hover:bg-gray-50 items-center"
              >
                <p className="w-[3%] py-3 px-1 ">{index + 1}</p>
                <p className="w-[20%] py-3 px-1">{item.userData.name}</p>
                <p className="w-[15%] py-3 px-1">{item.docData.speciality}</p>
                <p className="w-[7%] py-3 px-1">
                  {new Date().getFullYear() - item.userData.dob.split("-")[0]}
                </p>
                <p className="w-[20%] py-3 px-1">
                  {slotDateFormat(item.slotDate) + " | " + item.slotTime}
                </p>
                <p className="w-[20%] py-3 px-1">{item.docData.name}</p>
                <p className="w-[10%] py-3 px-1">
                  {currency}
                  {item.docData.fees}
                </p>
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
