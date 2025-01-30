import React from "react";
import AboutIntro from "../components/AboutIntro";
import ChooseUs from "../components/ChooseUs";

const About = () => {
  return (
    <div className="flex flex-col gap-12">
      <AboutIntro />
      <ChooseUs />
    </div>
  );
};

export default About;
