import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, dBackendUrl } =
    useContext(DoctorContext);
  const { currency, loading, setLoading } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        dBackendUrl + "/api/doctor/update-profile",
        {
          address: profileData.address,
          fees: profileData.fees,
          available: profileData.available,
        },
        {
          headers: {
            dToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setLoading(false);
        getProfileData();
        return;
      } else {
        setIsEdit(false);
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex flex-col gap-4">
        <div className="w-full bg-primary rounded-lg shadow-xl">
          <img
            src={profileData.image}
            className="w-full max-h-[200px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="text-4xl">{profileData.name}</h2>
          <div className="flex gap-2 text-slate-700">
            <h3>
              {profileData.degree} - {profileData.speciality}
            </h3>{" "}
            <div className="px-2 py-1 text-xs border border-black/10 rounded-full">
              {" "}
              {profileData.experience}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-semibold">About:</p>
            <p className=" text-slate-700">{profileData.about}</p>
          </div>
          <p className="text-xl">
            Appointment fee: {currency}
            {isEdit ? (
              <input
                type="number"
                className="bg-primary/10 outline-none border-none"
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profileData.fees}
              />
            ) : (
              profileData.fees
            )}
          </p>
          <p className="text-lg">
            Address:{" "}
            {isEdit ? (
              <input
                type="text"
                className="bg-primary/10 outline-none border-none"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                value={profileData.address}
              />
            ) : (
              profileData.address
            )}
          </p>
          <div className="flex gap-2">
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData.available}
              type="checkbox"
            />
            <p className="text-lg">Available</p>
          </div>
          <div className="max-w-30 ">
            {isEdit ? (
              <button
                disabled={loading}
                onClick={() => updateProfile()}
                className="btn w-full"
              >
                Save
              </button>
            ) : (
              <button onClick={() => setIsEdit(true)} className="btn w-full">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
