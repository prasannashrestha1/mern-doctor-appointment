import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-6 divide-y-1 divide-stone-500 items-center text-stone-500">
      <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
        <div className=" grow flex flex-col max-w-[646px] gap-10 pb-4 md:pb-8">
          <img src={assets.logo} className="w-50" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex flex-col min-[480px]:flex-row grow max-[480px]:gap-8 justify-start md:justify-end pb-4">
          <div className="min-w-[180px] ">
            <h4 className="text-stone-900 font-semibold mb-6">COMPANY</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-stone-900 cursor-pointer">
                Home
              </Link>
              <Link to="/about" className="hover:text-stone-900 cursor-pointer">
                About us
              </Link>
              <Link
                to="/contace"
                className="hover:text-stone-900 cursor-pointer"
              >
                Contact us
              </Link>
              <Link className="hover:text-stone-900 cursor-pointer">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className=" min-w-[200px]">
            <h4 className="text-stone-900 font-semibold mb-6">GET IN TOUCH</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-stone-900 cursor-pointer">
                +977-9860270060
              </Link>
              <Link
                to="/about"
                className="hover:text-stone-900 cursor-pointer text-nowrap"
              >
                <p>shresthaprasanna230@gmail.com</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>Copyright © 2024 Prasanna - All Right Reserved.</div>
    </div>
  );
};

export default Footer;
