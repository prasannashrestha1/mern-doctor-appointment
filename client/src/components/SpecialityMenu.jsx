import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className=" flex flex-col gap-12 items-center ">
      <div className="max-w-[570px] flex gap-4 flex-col text-center">
        <h2 className="text-3xl font-semibold">Find by Speciality </h2>
        <p>
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>

      <div className="flex justify-center gap-6 w-full overflow-x-scroll">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            className=" mb-5 flex flex-col gap-3 items-center cursor-pointer hover:translate-y-3 transition-all duration-500 text-xs min-w-0 max-w-[100vw] justify-center flex-shrink-0"
            to={`doctor/${item.speciality}`}
          >
            <img src={item.image} className="w-16 sm:w-24 h-16 sm:h-24" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
