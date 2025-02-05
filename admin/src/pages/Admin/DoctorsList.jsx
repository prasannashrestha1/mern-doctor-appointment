import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "./../../context/AdminContext";
import DocCard from "../../components/DocCard";

const DoctorsList = () => {
  const { backendUrl, aToken, allDoctor, fetchDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      fetchDoctors();
    }
  }, [aToken]);

  return (
    <div className="flex flex-col gap-4 h-[80vh] overflow-y-scroll">
      <h2 className="text-2xl">Add Doctor</h2>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allDoctor.map((item, index) => (
          <div key={index} className="w-full h-full">
            <DocCard
              image={item.image}
              speciality={item.speciality}
              name={item.name}
              available={item.available}
              id={item._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
