import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, CardMedia, Card, CardContent } from "@mui/material";
import axios from "axios";

const videos = [
    { id: 1, title: "Video 1", videoSrc: "https://www.w3schools.com/html/movie.mp4" },
    { id: 2, title: "Video 2", videoSrc: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Video 3", videoSrc: "https://www.w3schools.com/html/movie.mp4" },
    { id: 4, title: "Video 4", videoSrc: "https://www.w3schools.com/html/movie.mp4" },
    { id: 5, title: "Video 5", videoSrc: "https://www.w3schools.com/html/movie.mp4" },
];

const Watch_short2 = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    const [currentVideo, setCurrentVideo] = useState(0);
    const touchStart = useRef(0);
    const containerRef = useRef(null);
    const videoRefs = useRef([]);
    const isScrolling = useRef(false); // Flag to track if scroll is in progress

    // Handle swipe on mobile devices
    const handleSwipe = (e) => {
        const touchEnd = e.changedTouches[0].clientY;
        const swipeDistance = touchStart.current - touchEnd;

        if (swipeDistance > 100 && currentVideo < videos.length - 1) {
            setCurrentVideo((prev) => prev + 1); // Swipe up: next video
        } else if (swipeDistance < -100 && currentVideo > 0) {
            setCurrentVideo((prev) => prev - 1); // Swipe down: previous video
        }
    };

    const handleTouchStart = (e) => {
        touchStart.current = e.touches[0].clientY;
    };

    const handleWheel = (e) => {
        // Ignore scroll if already in progress or if at the video boundaries
        if (isScrolling.current || (e.deltaY > 0 && currentVideo >= videos.length - 1) || (e.deltaY < 0 && currentVideo <= 0)) {
            return;
        }

        isScrolling.current = true; // Start the scroll action

        // Scroll down: next video
        if (e.deltaY > 0 && currentVideo < videos.length - 1) {
            setCurrentVideo((prev) => prev + 1);
        }
        // Scroll up: previous video
        else if (e.deltaY < 0 && currentVideo > 0) {
            setCurrentVideo((prev) => prev - 1);
        }

        // Reset the scroll flag after a short delay to limit scrolling
        setTimeout(() => {
            isScrolling.current = false;
        }, 700); // Adjust the timeout as needed to control the scroll speed
    };

    // Pause all videos except the currently visible one
    const handleVideoPlayPause = () => {
        videoRefs.current.forEach((video, index) => {
            if (index === currentVideo) {
                video.play(); // Play the current video
            } else {
                video.pause(); // Pause other videos
            }
        });
    };

    // Detect when the user switches tabs or the tab becomes inactive
    const handleVisibilityChange = () => {
        if (document.hidden) {
            // Pause all videos when the tab is inactive
            videoRefs.current.forEach((video) => video.pause());
        } else {
            // Play the currently active video when the tab becomes active
            handleVideoPlayPause();
        }
    };

    const fecthVideo = async() => {
        const res = await axios.get(`${Backend_url}/Get_all_Shorts`)
        console.log(res.data)
    }

    // Effect to handle scroll behavior for PC and touch/swipe for mobile
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            fecthVideo();
            container.addEventListener("wheel", handleWheel); // For PC scroll
        }

        // Listen to visibility change to pause videos when switching tabs
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup event listeners on unmount
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [currentVideo]);

    // Handle video play/pause when the current video changes
    useEffect(() => {
        handleVideoPlayPause();
    }, [currentVideo]);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                background: "#000",
                overflowY: "hidden",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleSwipe}
            ref={containerRef}
        >
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2, color: "#fff" }}>
                Watch New Shorts
            </Typography>

            <Box sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        style={{
                            position: "absolute",
                            top: `${(index - currentVideo) * 100}vh`, // Stack videos vertically
                            width: "100%",
                            transition: "top 0.5s ease-in-out", // Smooth transition
                            height: "100vh", // Full screen height
                        }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                width: "100%",
                            }}
                        >
                            <CardMedia
                                component="video"
                                controls
                                ref={(el) => (videoRefs.current[index] = el)}
                                src={video.videoSrc}
                                alt={video.title}
                                autoPlay={index === currentVideo}
                                loop
                                muted={index !== currentVideo} // Mute videos that are not the current one
                                sx={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "auto",
                                    maxHeight: "100vh",
                                    maxWidth: "auto",
                                }}
                            />
                            <CardContent
                                sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 2,
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#fff" }}>
                                    {video.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default Watch_short2;
