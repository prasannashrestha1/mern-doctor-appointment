import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="w-full flex flex-col gap-12 text-center text-slate-600">
      <h2 className="text-3xl ">
        Contact <b>US</b>
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <img src={assets.contact_image} className=" md:w-[400px] rounded-xl " />
        <div className="flex text-sm flex-col gap-5 text-start w-full md:max-w-[400px]">
          <h3 className="text-xl text-slate-800">OUR OFFICE</h3>
          <p>
            Sitapaila, Kathmandu<br></br>
            Bagmati Nepal
          </p>
          <p>
            9860270060<br></br>
            Email: shresthaprasanna230@gmail.com
          </p>
          <h3 className="text-xl text-slate-800 mt-2">Job Opening</h3>
          <button className="border py-3 px-5 hover:bg-primary hover:text-white cursor-pointer w-fit border-slate-500">
            Expolore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
