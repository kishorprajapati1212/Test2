import React, { useState, useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './css/Slider.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Slider() {
  // State to track mute/unmute status for each video
  const [muted, setMuted] = useState(true);

  // Refs to store video elements
  const videoRefs = useRef([]);

  useEffect(() => {
    // Play videos after 1 second delay
    setTimeout(() => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play();
        }
      });
    }, 1000);
  }, []);

  const toggleMute = () => {
    // Toggle mute/unmute for all videos
    setMuted((prevMuted) => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = !prevMuted;
        }
      });
      return !prevMuted;
    });
  };

  return (
    <div className="swiper-container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="customSwiper"
        slidesPerView={1}  // Only show 1 slide at a time
        loop={true}        // Enable infinite looping of slides
      >
        <SwiperSlide className="customSwiperSlide">
          <video ref={(el) => (videoRefs.current[0] = el)} muted={muted} loop>
            <source src="/Home_page/1.mp4" type="video/mp4" />
          </video>
          <button className="mute-button" onClick={toggleMute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </SwiperSlide>
        <SwiperSlide className="customSwiperSlide">
          <video ref={(el) => (videoRefs.current[1] = el)} muted={muted} loop>
            <source src="/Home_page/1.mp4" type="video/mp4" />
          </video>
          <button className="mute-button" onClick={toggleMute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </SwiperSlide>
        <SwiperSlide className="customSwiperSlide">
          <video ref={(el) => (videoRefs.current[2] = el)} muted={muted} loop>
            <source src="/Home_page/1.mp4" type="video/mp4" />
          </video>
          <button className="mute-button" onClick={toggleMute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
