import React, { useEffect, useState } from 'react';
import './css/TopReels.css';
import axios from 'axios';

const TopReels = () => {
  const [reels, setReels] = useState([]);
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Get_all_Shorts`);
      setReels(res.data); // Store the fetched data into state
    } catch (error) {
      console.error("Error fetching reels:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnter = (video) => {
    video.play();  // Play video on hover
  };

  const handleMouseLeave = (video) => {
    video.pause();  // Pause video when hover ends
    video.currentTime = 0;  // Reset video to start (optional)
  };

  return (
    <div className="reels">
      <p>Top Reels</p>
      <div className="reels_card">
        <div className="card_area">
          {/* Map over the reels data to dynamically create video elements */}
          {reels.length > 0 ? (
            reels.map((reel, index) => (
              <div key={reel._id} className={`reel${index + 1} cardr`}>
                <div className={`r${index + 1}`}>
                  {/* Video component with poster (image) */}
                  <video
                    
                    poster={reel.short_image} // Display the image when the video is not hovered
                    onMouseEnter={(e) => handleMouseEnter(e.target)} // Start video on hover
                    onMouseLeave={(e) => handleMouseLeave(e.target)} // Pause video on hover out
                  >
                    <source src={reel.short_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* <p>{reel.short_title}</p> Show video title */}
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p> // Show loading text while data is being fetched
          )}
        </div>
      </div>
    </div>
  );
};

export default TopReels;
