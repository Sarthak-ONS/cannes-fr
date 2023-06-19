import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./CarouselSlider.css";
import { useNavigate } from "react-router-dom";

const carouselElements = [
  {
    id: "1",
    title: "Level up your style with our summer collections",
    linkto: "",
    image:
      "https://images.pexels.com/photos/8386645/pexels-photo-8386645.jpeg?auto=compress",
  },
  {
    id: "1",
    title: "Level up your style with our summer collections",
    linkto: "",
    image:
      "https://images.pexels.com/photos/7679453/pexels-photo-7679453.jpeg?auto=compress",
  },
  {
    id: "1",
    title: "Level up your style with our summer collections",
    linkto: "",
    image:
      "https://images.pexels.com/photos/5531746/pexels-photo-5531746.jpeg?auto=compress",
  },
];

const CarouselSlider = () => {
  const settings = {
    // dots: true,
    swipe: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // accessibility: false,
    arrows: false,
  };

  return (
    <Slider className="c_slider" {...settings}>
      {carouselElements.map((e) => (
        <CarouselCard key={e.id} title={e.title} image={e.image} />
      ))}
    </Slider>
  );
};

const CarouselCard = (props) => {
  const style = {
    backgroundImage: `url(${props.image})`,
    backdropFilter: ` brightness(50%) saturate(0%) opacity(70%)`,
  };

  const navigate = useNavigate();

  return (
    <div className="carousel__card" style={style}>
      <p>{props.title}</p>
      <button
        onClick={() => {
          navigate("products");
        }}
        className="carousel__card-btn"
      >
        Shop Now
      </button>
    </div>
  );
};

export default CarouselSlider;
