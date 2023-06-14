import React from "react";
import CarouselSlider from "../components/CarouselSlider/CarouselSlider";

import "./HomePage.css";
import Brands from "../components/Brands/Brands";

const HomePage = () => {
  return (
    <div className="HomePage">
      <CarouselSlider />
      <Brands />
    </div>
  );
};

export default HomePage;
