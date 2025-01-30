import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Footer from "./../components/Footer";
import AppointDoctors from "../components/AppointDoctors";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 max-w-[1440px] mx-auto">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <AppointDoctors />
    </div>
  );
};

export default Home;
