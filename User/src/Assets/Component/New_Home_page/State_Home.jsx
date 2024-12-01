import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './css/States.css';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

export default function State_Home() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch states from the backend
  const fetchState = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Get_all_State_names`);
      setStates(res.data); // Update states
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <>
      <div className="States">
        <div className="head">
          <h1>States</h1>
        </div>
        <div className="stateSwiperContainer">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Enable autoplay
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]} // Include Autoplay module
            className="stateSwiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
          >
            {states.map((state, index) => (
              <SwiperSlide key={state._id}>
                <Link to={`/state/${state.stateId}`}>
                  <div className={`stateSlideContent ${activeIndex === index ? 'active' : ''}`}>
                    <img
                      src={`https://swiperjs.com/demos/images/nature-${(index % 6) + 1}.jpg`}
                      alt={state.state_name}
                      className="stateSlideImage"
                    />
                    <h2 className="stateSlideTitle">{state.state_name}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* View More Button */}
          <div className="viewMoreContainer">
            <button className="viewMoreButton">View All</button>
          </div>
        </div>
      </div>
    </>
  );
}
