import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  return (
    <div className="w-full sticky top-0 bg-white z-10">
      <div className=" flex justify-between items-center max-w-[1440px] border-b text-sm md:text-md border-b-gray-400 p-4 mx-auto">
        <img
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          src={assets.logo}
          className="w-[140px] h-fit items-center cursor-pointer"
        />
        {/* navigation */}
        <div className="hidden md:flex font-semibold transition ease-in-out duration-700 gap-4 items-center">
          <NavLink to="/" className="navlink">
            HOME
          </NavLink>
          <NavLink to="/doctor" className="navlink">
            All DOCTORS
          </NavLink>
          <NavLink to="/about" className="navlink">
            ABOUT
          </NavLink>
          <NavLink to="/contact" className="navlink">
            CONTACT
          </NavLink>
          <a
            href="https://mern-doctor-appointment-mbiv.onrender.com"
            className="px-2 py-1 border border-primary/10 hover:bg-primary bg-primary/50 text-[10px] text-white rounded-full"
          >
            Admin Panel
          </a>
        </div>
        <div className="flex justify-between items-center gap-4">
          {token ? (
            <div className="flex gap-2 items-center justify-center cursor-pointer group relative">
              <img
                src={userData.image}
                className="w-[40px] h-[40px]  rounded-full"
                alt="profile"
              />
              <FaAngleDown />

              <div className="absolute top-10 rounded-xl text-gray-700 bg-stone-100 text-base font-medium hidden group-hover:block">
                <div className="min-w-45 p-3 flex flex-col gap-1 ">
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
                    onClick={() => {
                      setToken("");
                      localStorage.removeItem("token");
                    }}
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
              className=" px-4 py-2 md:px-6 md:py-3 cursor-pointer hover:shadow-sm hover:scale-101 transition-all duration-300 font-semibold bg-[#5F6FFF] text-white rounded-full"
            >
              Create Account
            </button>
          )}
          <RxHamburgerMenu
            className="block md:hidden w-[20px] h-[20px] cursor-pointer"
            onClick={() => setshowMenu(true)}
          />
          {showMenu && (
            <div
              className={`${
                showMenu ? "fixed w-full h-full" : "w-0 h-0"
              } md:hidden right-0 top-0 bottom-0s z-20 overflow-hidden  bg-white transition-all ease-in-out p-10`}
            >
              <div className="flex justify-between items-center mb-20">
                <img
                  onClick={() => {
                    navigate("/");
                    setshowMenu(false);
                  }}
                  src={assets.logo}
                  className="cursor-pointer"
                />
                <IoClose
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setshowMenu(false)}
                />
              </div>
              <div className="flex flex-col items-center gap-4 text-lg text-slate-700">
                <NavLink
                  onClick={() => setshowMenu(false)}
                  to="/"
                  className=" w-fit navlink"
                >
                  HOME
                </NavLink>
                <NavLink
                  onClick={() => setshowMenu(false)}
                  to="/doctor"
                  className=" w-fit navlink"
                >
                  ALL DOCTORS
                </NavLink>
                <NavLink
                  onClick={() => setshowMenu(false)}
                  to="/about"
                  className=" w-fit navlink"
                >
                  ABOUT
                </NavLink>
                <NavLink
                  onClick={() => setshowMenu(false)}
                  to="/contact"
                  className=" w-fit navlink"
                >
                  CONTACT
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
