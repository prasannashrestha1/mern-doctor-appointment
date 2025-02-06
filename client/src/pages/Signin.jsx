import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { token, setToken } = useContext(AppContext);
  const [signup, setSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signup) {
        if (!email || !password || !name) {
          return toast.error("Please fill in all Credentials");
        }
        const { data } = await axios.post("/api/user/signup", {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        if (!email || !password) {
          return toast.error("Please fill in all Credentials");
        }

        const { data } = await axios.post("/api/user/login", {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="sm:shadow-xl w-full shadow-blue-50 border-slate-300 sm:border-2 mx-auto  max-w-[500px] rounded-xl sm:py-12 sm:px-8 text-slate-700 flex gap-6 flex-col">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl ">{signup ? "Create Account" : "Login"}</h2>
          <p className="text-slate-500 border-b-2 border-slate-300 pb-2">
            {signup
              ? "Please sign up to book appointment"
              : "Please login to book appointment"}{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {signup && (
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="inpt"
                placeholder="full name"
                required
              />
            </div>
          )}

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
            {signup ? "Create Account" : "Login"}
          </button>
        </form>
        <p>
          {signup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setSignUp(!signup)}
            className="text-primary hover:text-blue-700 cursor-pointer"
          >
            {signup ? "Login here" : "Signup here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
