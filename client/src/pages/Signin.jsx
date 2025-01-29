import React from "react";

const Signin = () => {
  return (
    <div className="w-full mx-auto">
      <div className="shadow-xl mx-auto border max-w-[600px] rounded-xl py-8 px-6 text-slate-700 flex flex-col">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl ">Create Account</h2>
          <p className="text-slate-500">Please sign up to book appointment</p>
        </div>
        <form>
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              className="border p-2 outline-none border-slate-500"
              placeholder="full name"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
