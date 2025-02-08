import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const fileInputRef = useRef();
  const { userData, setUserData, getCurrentUser, token } =
    useContext(AppContext);
  const [image, setImage] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {}, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const updateUser = async () => {
    try {
      if (
        !userData.name ||
        !userData.phone ||
        !userData.dob ||
        !userData.gender ||
        !userData.address
      ) {
        toast.error("Fill in all mandatory Credentials");
        return;
      }
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", userData.address);

      image && formData.append("image", image);
      console.log(image);
      const { data } = await axios.post(
        "/api/user/book-appointment",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getCurrentUser();
      } else {
        toast.error(data.message);
      }
      setEdit(false);
      setImage(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setEdit(false);
    }
  };

  console.log(userData);
  return (
    <div className="h-screen text-slate-500">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-3xl text-slate-700 pb-3 border-b-2 border-b-slate-400">
          {edit ? (
            <div className="flex gap-4">
              <img
                onClick={() => fileInputRef.current.click()}
                src={image || userData.image} // Fallback image
                alt="Uploaded Preview"
                className="max-w-[160px] rounded-lg "
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <img
                src={userData.image} // Fallback image
                className="max-w-[160px] rounded-lg"
              />
            </div>
          )}

          {edit ? (
            <input
              type="text"
              className="profile-inpt"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p>{userData.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">CONTACT INFORMATION</p>
          <div className="flex">
            <p className="min-w-25 font-semibold">Email:</p>
            <p>{userData.email}</p>
          </div>
          <div className="flex">
            <p type="text" className="min-w-25 font-semibold">
              Phone:
            </p>
            {edit ? (
              <input
                type="text"
                className="profile-inpt"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              ></input>
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div className="flex">
            <p className="min-w-25 font-semibold">Address:</p>
            {edit ? (
              <input
                type="text"
                className="profile-inpt"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              ></input>
            ) : (
              <p>{userData.address ? userData.address : "Address not added"}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">BASIC INFORMATION</p>
          <div className="flex">
            <p className="min-w-25 font-semibold">Gender:</p>
            {edit ? (
              <select
                defaultValue={userData.gender}
                className="profile-inpt"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              >
                <option value="Non-Binary">Non</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div className="flex">
            <p type="text" className="min-w-25 font-semibold">
              Birthday:
            </p>
            {edit ? (
              <input
                type="date"
                className="profile-inpt"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
              ></input>
            ) : (
              <p>{userData.dob ? userData.dob : "Birthday not added"}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => (edit ? updateUser() : setEdit(true))}
          className=" hover:text-white hover:bg-primary cursor-pointer px-8 py-2 border border-slate-300 rounded-2xl w-fit"
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
