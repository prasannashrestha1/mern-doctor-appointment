import React from "react";
import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="max-w-[1440px] mt-4 mx-auto flex flex-col md:flex-row bg-primary w-full rounded-xl gap-3 md:gap-4 pt-6 px-6 md:px-10 lg:px-20">
      {/* left content */}
      <div className="flex flex-col items-center md:items-start justify-center grow gap-3 my-15 mx-6 sm:mx-14 md:mx-0 md:gap-4 text-white">
        <h1>Book Appointment with Trusted Doctors</h1>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <img src={assets.group_profiles} className="w-20 h-fit" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free
          </p>
        </div>
        <Link
          hrefLang="#specialit"
          className="flex items-center gap-2 bg-white w-fit text-gray-700 hover:text-black rounded-3xl px-6 py-2 m-auto md:m-0 hover:scale-105 transition ease-in-out duration-300"
        >
          Book appointment <img src={assets.arrow_icon} className="w-3 h-3" />
        </Link>
      </div>
      {/* right content */}
      <div className="flex grow relative items-end justify-end">
        <img src={assets.header_img} className="w-full h-fit mt-1" />
      </div>
    </div>
  );
};

export default Header;
