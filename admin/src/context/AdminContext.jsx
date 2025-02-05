import axios from "axios";
import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [allDoctor, setAllDoctor] = useState([]);

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

  const value = {
    aToken,
    setAToken,
    allDoctor,
    backendUrl,
    setAllDoctor,
    fetchDoctors,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
