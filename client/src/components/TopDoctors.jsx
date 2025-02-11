import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DocCard from "./DocCard";

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
          <div
            onClick={() => {
              scrollTo(0, 0);
              navigate(`/appointment/${item._id}`);
            }}
            key={index}
            className="cursor-pointer"
          >
            <DocCard
              name={item.name}
              speciality={item.speciality}
              image={item.image}
              available={item.available}
            />
          </div>
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
