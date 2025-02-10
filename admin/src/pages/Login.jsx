import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken, dBackendUrl } = useContext(DoctorContext);

  // if state = true is admin and statle = false is doctor
  const [state, setState] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state) {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(dBackendUrl + "/api/doctor/login", {
          email,
          password,
        });
        console.log(data);
        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="sm:shadow-xl w-full shadow-blue-50 border-slate-300 sm:border-2 mx-auto  max-w-[500px] rounded-xl sm:py-12 sm:px-8 text-slate-700 flex gap-6 flex-col">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl ">
            {state ? "Admin Login" : "Doctor Login"}
          </h2>
        </div>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="inpt "
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="inpt"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-blue-700 px-4 py-2 text-white rounded-lg w-full cursor-pointer text-center"
          >
            {state ? "Admin signin" : "Doctor Signin"}
          </button>
        </form>
        <p>
          {state ? "Not an admin?" : "click here for?"}{" "}
          <span
            onClick={() => {
              setState(!state);
              setPassword("");
              setEmail("");
            }}
            className="text-primary hover:text-blue-700 cursor-pointer"
          >
            {state ? "Doctor login" : "Admin login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
