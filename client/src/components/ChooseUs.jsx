import React from "react";

const ChooseUs = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl">WHY CHOOSE US</h2>
      <div className="flex flex-col lg:flex-row border border-slate-200">
        <div className=" flex flex-col gap-4 p-10 sm:p-20 border-slate-200 border-b lg:border-r group hover:bg-primary transition ease-in-out duration-300 cursor-pointer">
          <h4 className="text-xl group-hover:text-white">EFFECIENCY</h4>
          <p className="group-hover:text-white">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className=" flex flex-col gap-4 p-10 sm:p-20 border-slate-200 border-b lg:border-r group hover:bg-primary transition ease-in-out duration-300 cursor-pointer">
          <h4 className="text-xl group-hover:text-white">Convenience:</h4>
          <p className="group-hover:text-white">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className=" flex flex-col gap-4 p-10 sm:p-20 border-slate-200 border-b lg:border-r group hover:bg-primary transition ease-in-out duration-300 cursor-pointer">
          <h4 className="text-xl group-hover:text-white">Personalization</h4>
          <p className="group-hover:text-white">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
