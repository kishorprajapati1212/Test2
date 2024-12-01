import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const State_Slide = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const stateId = useParams().stateId;
  const [sliderData, setSliderData] = useState([]);
  const [stateName, setStateName] = useState("");

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/State_Home_Slider_Content/${stateId}`);
      setStateName(res.data.state_name.state_name);
      setSliderData(res.data.food || []); // Default to an empty array if no data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        py: 6,
        background: "#f9fafc", // Subtle background to blend well
      }}
    >
      {/* <Container maxWidth="md"> */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#222",
          textTransform: "capitalize",
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        {stateName && `Explore The ${stateName}`}
      </Typography>
      <Box>
        <Slider {...sliderSettings}>
          {sliderData.length > 0 ? (
            sliderData.map((item, index) => (
              <Box key={index} sx={{ position: "relative", width: "100%" }}>
                {/* Image Section */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "400px", // Fixed height for images
                    overflow: "hidden",
                    cursor: "pointer", // Indicating it's clickable
                    "&:hover .description-overlay": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <img
                    src={item.food_image?.[0] || "default-image-url"}
                    alt={item.food_name}
                    style={{
                      width: "100%", // Make the image fill 100% width
                      height: "100%", // Full height
                      objectFit: "cover", // Ensure image covers the container
                      transition: "transform 0.3s ease",
                    }}
                  />
                  {/* Description Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      opacity: 0,
                      backdropFilter: "blur(8px)", // Add blur effect
                      transform: "translateY(100%)", // Hidden by default
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className="description-overlay"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        fontSize: "1.4rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.food_name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.origi_story || "No origin story available."}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ color: "#555" }}>
              Loading...
            </Typography>
          )}
        </Slider>
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default State_Slide;
