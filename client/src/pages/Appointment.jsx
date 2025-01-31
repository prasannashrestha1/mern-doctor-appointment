import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import DocCard from "./../components/DocCard";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const [docBio, setDocBio] = useState({});
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  const doctorDescription = () => {
    setDocBio(doctors.filter((doc) => doc._id === docId)[0]);
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);

    //get current date
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        //increament current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    doctorDescription();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, []);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return docBio ? (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col items-end gap-10 text-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-primary sm:min-w-[350px] flex items-end justify-center rounded-xl">
            <img src={docBio.image} className="" />
          </div>
          <div className="flex flex-col gap-5 px-8 py-12 border grow border-slate-400 rounded-xl">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold text-black">
                {docBio.name}
              </h2>
              <div className="flex gap-3 items-center">
                <p className="text-sm ">
                  {docBio.degree + " - " + docBio.speciality}
                </p>
                <div className="text-[10px] py-1 px-2 border rounded-xl border-slate-200">
                  {docBio.experience}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="">About</p>
              </div>
              <p>{docBio.about}</p>
            </div>
            <div className=" text-slate-900 text-lg">
              Appointment Fees:{" "}
              <span className=" font-semibold">
                {currencySymbol}
                {docBio.fees}
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-[1074px] flex flex-col gap-6  w-full">
          <h2 className="text-xl font-semibold text-black ">Booking Slots</h2>
          <div className="flex gap-3 w-full overflow-x-scroll">
            {docSlot.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={` ${
                  slotIndex === index
                    ? "bg-primary text-white hover:bg-primary"
                    : ""
                }  flex flex-col items-center  justify-center p-4 hover:bg-blue-200 transition ease-in-out duration-300 rounded-full group border cursor-pointer border-slate-300`}
              >
                <p className=" group-hover:text-white w-[40px] text-center">
                  {item[0] && item[0].datetime
                    ? daysOfWeek[item[0].datetime.getDay()]
                    : daysOfWeek[new Date().getDay()]}
                </p>
                <p className=" group-hover:text-white">
                  {item[0] ? item[0].datetime.getDate() : new Date().getDate()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full overflow-x-scroll text-center">
            {docSlot.length ? (
              docSlot[slotIndex].map((item, index) => (
                <div
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`${
                    slotTime === item.time
                      ? "bg-primary text-white hover:bg-primary"
                      : ""
                  } px-4 py-2 min-w-[120px] border rounded-4xl cursor-pointer hover:bg-primary hover:text-white m-2`}
                >
                  {item.time}
                </div>
              ))
            ) : (
              <div>No available slots</div>
            )}
          </div>
          <button className="bg-primary hover:bg-blue-700 text-white rounded-4xl p-4 text-center max-w-[400px] cursor-pointer">
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Similar Doctors  */}
      <RelatedDoctors docBio={docBio} />
    </div>
  ) : (
    ""
  );
};

export default Appointment;
