import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import DocCard from "./DocCard";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docBio }) => {
  const navigate = useNavigate();
  const { doctors, currencySymbol } = useContext(AppContext);

  return (
    <div className=" flex flex-col gap-12 items-center ">
      <div className="max-w-[570px] flex gap-4 flex-col text-center">
        <h2 className="text-3xl font-semibold">Top Doctors to Book </h2>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div>
      <div className=" w-full grid max-[500px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
        {doctors
          .filter(
            (doc) =>
              doc.speciality === docBio.speciality && doc._id !== docBio._id
          )
          .slice(0, 5)
          .map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="cursor-pointer"
            >
              <DocCard
                name={item.name}
                speciality={item.speciality}
                image={item.image}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
