import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const dBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const fetchAppointments = async (req, res) => {
    try {
      const { data } = await axios.get(
        dBackendUrl + "/api/doctor/doctor-appointments",
        {
          headers: {
            dToken,
          },
        }
      );
      if (!data.success) {
        toast.error(data.message);
        return;
      } else {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        dBackendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            dToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        dBackendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            dToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(dBackendUrl + "/api/doctor/dashboard", {
        headers: {
          dToken,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(dBackendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    dashData,
    setDashData,
    dBackendUrl,
    profileData,
    setProfileData,
    appointments,
    setAppointments,
    fetchAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
