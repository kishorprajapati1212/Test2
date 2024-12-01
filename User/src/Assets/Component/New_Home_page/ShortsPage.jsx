import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import "./css/Reels.css";

const ShortsPage = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [activeVideo, setActiveVideo] = useState(null);
  const [videos, setVideos] = useState([]); // State to hold the videos from the API

  // Fetch videos from the API
  const fetchShorts = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Home_Page_Shorts`);
      setVideos(res.data); // Update the videos state with the data from the API
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchShorts(); // Fetch videos on component mount
  }, []);

  const handlePlay = (id) => setActiveVideo(id);
  const handlePause = () => setActiveVideo(null);

  const handleMouseEnter = (id) => setActiveVideo(id); // Play video on hover
  const handleMouseLeave = () => setActiveVideo(null); // Pause video when mouse leaves

  return (
    <div className={`shorts-container ${activeVideo ? "blur-background" : ""}`}>
      <h1>Short Videos</h1>
      <div className="shorts-list">
        {videos.map((video) => (
          <div
            key={video.videoId}
            className={`shorts-item ${
              activeVideo === video.videoId ? "active-video" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(video.videoId)} // Hover to play
            onMouseLeave={handleMouseLeave} // Hover out to pause
          >
            <ReactPlayer
              url={video.short_url} // Use the URL from the API response
              controls={true}
              playing={activeVideo === video.videoId}
              onPlay={() => handlePlay(video.videoId)}
              onPause={handlePause}
              onEnded={handlePause}
              width="100%"
              height="100%"
            />
            <p
              className="video-title"
              style={{ fontFamily: "inter", fontStyle: "medium", fontSize: 14 }}
            >
              {video.short_title} {/* Use the title from the API response */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsPage;
  