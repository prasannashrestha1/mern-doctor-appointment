import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div id="speciality" className=" flex flex-col gap-12 items-center ">
      <div className="max-w-[570px] flex gap-4 flex-col text-center">
        <h2 className="text-3xl font-semibold">Top Doctors to Book </h2>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div>
      <div className=" w-full grid max-[500px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
        {doctors.slice(0, 10).map((item, index) => (
          <Link
            to={`/appointment/${item._id}`}
            key={index}
            className="border border-[#C9D8FF] rounded-2xl hover:shadow-lg hover:scale-102 transition-all ease-in-out duration-300"
          >
            <div className="flex items-center justify-end bg-[#EAEFFF] rounded-t-2xl ">
              <img src={item.image} />
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="text-green-600 flex gap-2 mb-1 items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <p>Available</p>
              </div>
              <h2 className=" text-2xl">{item.name}</h2>
              <p className="text-gray-700">{item.speciality}</p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-[#EAEFFF] px-16 py-4 rounded-4xl mb-10 cursor-pointer hover:scale-103 transition-all ease-in-out duration-300 hover:shadow"
      >
        Explore More
      </button>
    </div>
  );
};

export default TopDoctors;
