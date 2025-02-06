import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState({});

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get("/api/doctor/list");
      if (data.success) {
        setDoctors(data.allDoctors);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/user/get-profile", {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    getCurrentUser,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
