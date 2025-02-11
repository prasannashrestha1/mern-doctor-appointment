import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [allDoctor, setAllDoctor] = useState([]);
  const [allAppointment, setAllAppointment] = useState([]);
  const [dashData, setDashData] = useState([]);

  const fetchAppoitnments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-appointments",
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setAllAppointment(data.allAppointments);
      } else {
        toast.error("Couldn't fetch doctors data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setAllDoctor(data.allDoctors);
      } else {
        toast.error("Couldn't fetch doctors data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        fetchAppoitnments();
        return toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: {
          aToken,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error while fetching Dashboard Data");
    }
  };

  const value = {
    aToken,
    setAToken,
    allDoctor,
    allAppointment,
    backendUrl,
    dashData,
    setAllDoctor,
    fetchDoctors,
    fetchAppoitnments,
    cancelAppointment,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
