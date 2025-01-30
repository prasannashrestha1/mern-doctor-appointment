import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const [resFilter, setResFilter] = useState(true);
  const [filterDoc, setFilterDoc] = useState([]);

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div className="flex flex-col gap-4 text-stone-700 pb-10">
      <p>Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          onClick={() => setResFilter(!resFilter)}
          className={`px-3 py-2 w-fit border h-fit  ${
            resFilter
              ? "text-white bg-primary border-primary hover:bg-blue-600"
              : "hover:bg-blue-50 border-slate-300"
          } rounded-lg cursor-pointer block sm:hidden`}
        >
          Filters
        </div>
        {resFilter ? (
          <div className="w-full sm:max-w-[200px] flex flex-col gap-2 list-none">
            <Link
              to="/doctor"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              All Doctors
            </Link>
            <Link
              to="/doctor/General physician"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              General Physician
            </Link>
            <Link
              to="/doctor/Gynecologist"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              Gynecologist
            </Link>
            <Link
              to="/doctor/Dermatologist"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              Dermatologist
            </Link>
            <Link
              to="/doctor/Pediatricians"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              Pediatricians
            </Link>
            <Link
              to="/doctor/Neurologist"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              Neurologist
            </Link>
            <Link
              to="/doctor/Gastroenterologist"
              className="w-full border-2 px-3 py-2 border-stone-200 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              Gastroenterologist
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className=" w-full max-h-[80vh] overflow-x-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 ">
          {filterDoc.map((item, index) => (
            <Link
              to={`/appointment/${item._id}`}
              key={index}
              className="border m-2 border-[#C9D8FF] rounded-2xl hover:shadow-lg hover:scale-102 transition-all ease-in-out duration-300"
            >
              <div className="flex items-center justify-center bg-[#EAEFFF] rounded-t-2xl ">
                <img src={item.image} />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <div className="text-green-600 flex gap-2 mb-1 items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p>Available</p>
                </div>
                <h2 className=" text-2xl">{item.name}</h2>
                <p className="text-gray-700">{item.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* {
          <div className={`text-3xl ${filterDoc ? "block" : "hidden"}`}>
            {" "}
            No Doctors Available
          </div>
        } */}
      </div>
    </div>
  );
};

export default Doctors;
