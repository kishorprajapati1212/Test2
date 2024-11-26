import React from "react";
import { Box, AppBar, Toolbar, Typography, Button, Container, CardMedia, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StateSlide() {
  const sliderData = [
    { title: "Famous Food", img: "/Photes/UT.jpg", description: "Enjoy the traditional flavors of Gujarat." },
    { title: "Festivals", img:  "/Photes/UT.jpg", description: "Vibrant festivals showcasing rich culture." },
    { title: "Heritage Sites", img:  "/Photes/UT.jpg", description: "Explore the historical marvels of Gujarat." },
    { title: "Rann of Kutch", img:  "/Photes/UT.jpg", description: "Witness the vast white desert." },
    { title: "Handicrafts", img:  "/Photes/UT.jpg", description: "Intricate artistry and local crafts." },
    { title: "Wildlife", img:  "/Photes/UT.jpg", description: "Home to Asiatic lions and rich biodiversity." },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      {/* Header Section */}

      {/* Slider Section */}
      <Container sx={{ marginTop: 4 }}>
      <div className="title">Explore Gujarat</div>
        <Slider {...sliderSettings}>
          {sliderData.map((item, index) => (
            <Box key={index} sx={{ padding: 4 }}>
              <Grid container spacing={4} alignItems="center">
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                {/* Information Section */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}

export default StateSlide;