import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Grid, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const State_Slide = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;  // Ensure the env variable is defined in .env
  const stateId = useParams().stateId;
  const [sliderData, setSliderData] = useState([]);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/State_Home_Slider_Content/${stateId}`);
      // Assuming res.data is an array of objects with food details
      setSliderData(res.data.food); 
      console.log(sliderData)
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
    autoplaySpeed: 3000,
    arrows: true, // Show navigation arrows
    adaptiveHeight: true, // Adjust slider height dynamically
  };

  return (
    <Box>
      {/* Slider Section */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Himachal Pradesh
        </Typography>
        <Slider {...sliderSettings}>
          {sliderData.length > 0 ? (
            sliderData.map((item, index) => (
              <Box key={index} sx={{ padding: 4 }}>
                <Grid container spacing={4} alignItems="center">
                  {/* Image Section */}
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      image={item.food_image && item.food_image.length > 0 ? item.food_image[0] : 'default-image-url'} // Fallback image if empty
                      alt={item.food_name}
                      sx={{
                        width: "100%",
                        height: { xs: "250px", md: "400px" }, // Responsive image height
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  </Grid>
                  {/* Information Section */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                      {item.food_name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {item.origi_story || "No origin story available."}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center">Loading...</Typography>
          )}
        </Slider>
      </Container>
    </Box>
  );
};

export default State_Slide;
