import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const fileInputRef = useRef();
  const [userData, setUserData] = useState({
    image: assets.profile_pic,
    name: "Prasanna Shrestha",
    email: "shresthaprasanna230@gmail.com",
    phone: "977-9860270060",
    address: "sitapaila",

    gender: "Male",
    dob: "2001-10-13",
  });
  const [image, setImage] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setImage(assets.about_image);
  }, []);

  return (
    <div className="h-screen text-slate-500">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-3xl text-slate-700 pb-3 border-b-2 border-b-slate-400">
          <div className="flex gap-4">
            <img
              onClick={() => fileInputRef.current.click()}
              src={userData.image}
              className="max-w-[160px] rounded-lg cursor-pointer"
            />
            <input type="file" hidden accept="image/*" ref={fileInputRef} />
          </div>
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
            {edit ? (
              <input
                type="text"
                className="profile-inpt"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              ></input>
            ) : (
              <p>{userData.email}</p>
            )}
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
              <p>{userData.address}</p>
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
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setEdit(!edit)}
          className=" hover:text-white hover:bg-primary cursor-pointer px-8 py-2 border border-slate-300 rounded-2xl w-fit"
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
