import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 max-w-[1440px] mx-auto">
      <Header />
      <SpecialityMenu />
    </div>
  );
};

export default Home;
