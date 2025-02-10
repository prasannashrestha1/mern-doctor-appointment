import React, { useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const DocCard = ({ id, image, speciality, name, available }) => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const handleChangeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log(id);
  return (
    <div className="border h-full m-1 border-[#C9D8FF] group rounded-2xl cursor-pointer hover:shadow-lg transition-all ease-in-out duration-300">
      <div className="w-full h-[200px] rounded-t-2xl overflow-hidden bg-[#EAEFFF] group-hover:bg-primary flex items-center justify-center">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="text-green-600 flex gap-2 mb-1 items-center">
          <input
            type="checkbox"
            className="w-4 h-4"
            onClick={() => handleChangeAvailability(id)}
          />
          <p>{available ? "Available" : "Not Available"}</p>
        </div>
        <h2 className="text-2xl">{name}</h2>
        <p className="text-gray-700">{speciality}</p>
      </div>
    </div>
  );
};

export default DocCard;
