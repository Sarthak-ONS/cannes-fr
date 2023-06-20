import React from "react";
import { useLoaderData } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductDescriptionPage.css";

const ProductDescriptionPage = () => {
  const data = useLoaderData();

  console.log(data.product);

  return (
    <div className="ProductDescriptionPage">
      <div className="ProductDescriptionPage-images">
        <p>Images</p>
        <ul>
          {data.product.imageUrls.map((item) => (
            <div className="item-image" key={item.id}>
              <img src={item.secure_url} alt="im"></img>
            </div>
          ))}
        </ul>
      </div>
      <div className="ProductDescriptionPage-content">
        <h2 className="ProductDescriptionPage-content__title">
          {data && data.product && data.product.name}
        </h2>
        <h3>Rs. {data.product.price}</h3>
        <h4>Brand: {data && data.product && data.product.brand}</h4>
        <h5>{data && data.product && data.product.description}</h5>
        <p>
          <button className="add-to-cart-cta" type="button">
            Add to Cart
          </button>
        </p>
      </div>
    </div>
  );
};

export async function loader({ request, params }) {
  const p = params;
  const response = await fetch(
    process.env.REACT_APP_BACKEND_HOST + "/product/" + p.productId
  );

  if (!response.ok) {
    const data = { message: "Coult not fetch Products" };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

const ProductDescriptionImagesCarouselSlider = (imageUrls) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 2000,
  };

  console.log(imageUrls, "These are the image Urls now");

  return (
    <div>
      <Slider {...settings}>
        {imageUrls.map((item) => {
          return (
            <div key={item.d}>
              <img src={item.secure_url} alt="Product image" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductDescriptionPage;
