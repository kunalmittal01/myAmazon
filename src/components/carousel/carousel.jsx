import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ images }) => {

    const NextArrow = ({ onClick }) => {
        return (
          <div className="custom-arrow custom-arrow-next" onClick={onClick}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        );
      };
      
      const PrevArrow = ({ onClick }) => {
        return (
          <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        );
      };

    const settings = {
        dots: false, 
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
      };

    return (
        <div className="carousel-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`slide-${index}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Slider>
          <div className="gradient"></div>
        </div>
      );
    }

    export default Carousel;