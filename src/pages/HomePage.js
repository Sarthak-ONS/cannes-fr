import React from "react";
import { CiBoxes, CiDeliveryTruck, CiHotdog, CiMedal } from "react-icons/ci";

import CarouselSlider from "../components/CarouselSlider/CarouselSlider";
import "./HomePage.css";
import Brands from "../components/Brands/Brands";
import FeatureCard from "../components/FeatureCard/FeatureCard";

const features = [
  {
    id: "1",
    title: "Original Products",
    subtitle: "We provide money back gurantee if the product was not original",
    icon: <CiBoxes size={40} className="feature-icon" />,
  },
  {
    id: "2",
    title: "Satisfaction Gurantee",
    subtitle: "Exchange the product you 've purchased if it doesn't fit on you",
    icon: <CiHotdog size={40} className="feature-icon" />,
  },
  {
    id: "3",
    title: "New Arrival Everyday",
    subtitle: "We updates our collections almost everyday",
    icon: <CiMedal size={40} className="feature-icon" />,
  },
  {
    id: "4",
    title: "Fast & Free Shipping",
    subtitle: "We offer fast and free shipping for our loyal customers",
    icon: <CiDeliveryTruck size={40} className="feature-icon" />,
  },
];

const HomePage = () => {
  return (
    <div className="HomePage">
      <CarouselSlider />
      <Brands />
      <div className="HomePage-content">
        <div className="HomePage-content-h1">
          We provide best
          <br /> customer experiences
        </div>
        <div className="HomePage-content-h2">
          We ensure our customers have the best shopping experience
        </div>
      </div>

      <div className="HomePage-features">
        <ul>
          {features.map((e) => (
            <li>
              {e.icon}
              <FeatureCard key={e.id} title={e.title} subtitle={e.subtitle} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
