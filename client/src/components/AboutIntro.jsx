import React from "react";
import { assets } from "../assets/assets";

const AboutIntro = () => {
  return (
    <div className="flex flex-col gap-12 text-center">
      <h2 className="text-3xl ">
        ABOUT <b>US</b>
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img src={assets.about_image} className=" md:w-[400px] rounded-xl " />
        <div className="flex text-sm flex-col gap-5 text-start max-w-[700px]">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p>Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;
