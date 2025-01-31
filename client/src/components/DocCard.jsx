import React from "react";

const DocCard = ({ image, speciality, name }) => {
  return (
    <div className="border border-[#C9D8FF] rounded-2xl hover:shadow-lg hover:scale-102 transition-all ease-in-out duration-300">
      <div className="flex items-center justify-end bg-[#EAEFFF] rounded-t-2xl ">
        <img src={image} />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="text-green-600 flex gap-2 mb-1 items-center">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <p>Available</p>
        </div>
        <h2 className=" text-2xl">{name}</h2>
        <p className="text-gray-700">{speciality}</p>
      </div>
    </div>
  );
};

export default DocCard;
