import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="w-full">
      <div className=" flex justify-between items-center max-w-[1440px] border-b text-sm md:text-md border-b-gray-400 p-4 mx-auto">
        <img
          src={assets.logo}
          className="w-[140px] h-fit items-center cursor-pointer"
        />
        {/* navigation */}
        <div className="hidden md:flex font-semibold transition ease-in-out duration-700 gap-4 items-center">
          <NavLink
            to="/"
            className="h-fit border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 transition ease-in-out duration-500 "
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className="h-fit border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 transition ease-in-out duration-500 "
          >
            All DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className="h-fit border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 transition ease-in-out duration-500 "
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="h-fit border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 transition ease-in-out duration-500 "
          >
            CONTACT
          </NavLink>
        </div>
        <div className="flex justify-between items-center gap-4">
          {token ? (
            <div className="flex gap-2 items-center justify-center cursor-pointer group relative">
              <img
                src={assets.profile_pic}
                className="w-[40px] rounded-full"
                alt="profile"
              />
              <FaAngleDown />

              <div className="absolute top-10 rounded-xl text-gray-700 bg-stone-100 text-base font-medium hidden group-hover:block">
                <div className="min-w-42 p-3 flex flex-col gap-1 ">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-200"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-200"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => setToken(false)}
                    className="hover:text-black cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-200"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className=" px-4 py-2 md:px-6 md:py-3  font-semibold bg-[#5F6FFF] text-white rounded-full"
            >
              Create Account
            </button>
          )}
          <RxHamburgerMenu className="block md:hidden w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
