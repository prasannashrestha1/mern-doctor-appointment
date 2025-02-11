import React, { useContext } from "react";
import { assets } from "./../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(AppContext);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear("atoken");
    aToken && setAToken("");
    localStorage.clear("dtoken");
    dToken && setDToken("");
    navigate("/login");
    location.reload();
  };
  return (
    <div className="px-10 py-5 flex justify-between items-center border border-[#bec0c3]">
      <div className="flex gap-4 w-fit items-center justify-center">
        <img src={assets.admin_logo} />
        <div className="rounded-2xl mt-2 h-fit border px-2 text-xs py-1 hover:text-white hover:bg-primary cursor-pointer border-primary bg-white text-primary">
          {aToken ? "Admin" : "Doctor"}
        </div>
      </div>
      <div
        onClick={Logout}
        className="rounded-4xl text-xs sm:text-sm border px-4 sm:px-12 py-2 hover:bg-blue-600 bg-primary cursor-pointer border-primary  text-white"
      >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
