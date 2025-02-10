import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="py-4 flex flex-col gap-3 border-r-2 grow border-[#bec0c3] h-full min-w-20 lg:min-w-[250px] max-w-20 lg:max-w-[250px]">
      {aToken && (
        <>
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.home_icon} alt="" />
              <p className="hidden lg:block">Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.appointment_icon} alt="" />
              <p className="hidden lg:block">Appointments</p>
            </div>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 w-full">
              <img src={assets.home_icon} />
              <p className="hidden lg:block">Add Doctor</p>
            </div>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.people_icon} alt="" />
              <p className="hidden lg:block">Doctors List</p>
            </div>
          </NavLink>
        </>
      )}
      {dToken && (
        <>
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.home_icon} alt="" />
              <p className="hidden lg:block">Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.appointment_icon} alt="" />
              <p className="hidden lg:block">Appointments</p>
            </div>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex gap-4 pl-6 cursor-pointer justify-between ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <div className="flex gap-3 py-2 ">
              <img src={assets.people_icon} alt="" />
              <p className="hidden lg:block">Doctors Profile</p>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
