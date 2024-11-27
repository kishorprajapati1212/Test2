import React, { useState, useEffect } from "react";
import "./css/Slider.css";

const Slider = () => {
  // Define the images for the slider
  const images = [
    "/Slider_img/nature.png", // First image
    "/Slider_img/nature.png", // Second image
    "/Slider_img/nature.png", // Third image
  ];

  // State to manage the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [images.length]);

  return (
    <div className="slider">
      <div
        className="slider-images"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Moves the images horizontally
          transition: "transform 0.5s ease-in-out", // Smooth transition for sliding
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
