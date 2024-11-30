import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const State_Slide = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL; // Ensure the .env file is set up
  const stateId = useParams().stateId;
  const [sliderData, setSliderData] = useState([]);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/State_Home_Slider_Content/${stateId}`);
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
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "#222", // Neutral dark text
            textTransform: "capitalize",
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          Explore The State
        </Typography>
        <Slider {...sliderSettings}>
          {sliderData.length > 0 ? (
            sliderData.map((item, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "stretch",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Light shadow for modern look
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    },
                    background: "#fff", // Maintain neutral white background
                  }}
                >
                  {/* Image Section */}
                  <CardMedia
                    component="img"
                    image={item.food_image?.[0] || "default-image-url"}
                    alt={item.food_name}
                    sx={{
                      width: { xs: "100%", sm: "40%" },
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  {/* Text Content Section */}
                  <Box
                    sx={{
                      p: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: "#333", // Neutral dark text color
                        fontSize: "1.4rem",
                        textTransform: "capitalize",
                        textAlign:"center"
                      }}
                    >
                      {item.food_name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555", // Subtle gray text
                        fontSize: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.origi_story || "No origin story available."}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ color: "#555" }}>
              Loading...
            </Typography>
          )}
        </Slider>
      </Container>
    </Box>
  );
};

export default State_Slide;
