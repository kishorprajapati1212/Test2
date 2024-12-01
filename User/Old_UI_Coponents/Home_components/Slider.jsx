// import React, { useState, useEffect } from "react";
// import "./css/Slider.css";

// const Slider = () => {
//   // Define the images for the slider
//   const images = [
//     "/Slider_img/nature.png", // First image
//     "/Slider_img/nature.png", // Second image
//     "/Slider_img/nature.png", // Third image
//   ];

//   // State to manage the current image index
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Automatically change the image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
//     }, 3000);

//     return () => clearInterval(interval); // Clear the interval on unmount
//   }, [images.length]);

//   return (
//     <div className="slider">
//       <div
//         className="slider-images"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`, // Moves the images horizontally
//           transition: "transform 0.5s ease-in-out", // Smooth transition for sliding
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="slide">
//             <img src={image} alt={`slide-${index}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Core slider styles
import "slick-carousel/slick/slick-theme.css"; // Slider theme styles

const SliderComponent = () => {
  // Define the images for the slider
  const images = [
    "/Slider_img/nature.png", // First image
    "/Slider_img/nature.png", // Second image
    "/Slider_img/nature.png", // Third image
  ];

  // Slider settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Duration between slides (ms)
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}> {/* Full width container */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "70vh", // Full viewport height
                objectFit: "cover", // Ensure image covers the container
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
