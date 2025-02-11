import React from "react";

const DocCard = ({ image, speciality, name, available }) => {
  return (
    <div className="border border-[#C9D8FF] m-2 rounded-2xl hover:shadow-lg hover:scale-102 transition-all ease-in-out duration-300">
      <div className="w-full h-[200px] rounded-t-2xl overflow-hidden bg-[#EAEFFF] group-hover:bg-primary flex items-center justify-center">
        <img src={image} className="w-full h-full object-contain" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div
          className={`${
            available ? "text-green-600" : "text-red-500"
          } flex gap-2 mb-1 items-center`}
        >
          <div
            className={`w-2 h-2 ${
              available ? "bg-green-600" : "bg-red-500"
            } rounded-full`}
          ></div>
          <p>{available ? "Available" : "Not Available"}</p>
        </div>
        <h2 className=" text-2xl">{name}</h2>
        <p className="text-gray-700">{speciality}</p>
      </div>
    </div>
  );
};

export default DocCard;
