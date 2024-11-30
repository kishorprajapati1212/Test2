// src/components/State_Card.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const State_Card = () => {
  const stateId = useParams().stateId;
  const navigate = useNavigate();

  const cardDetails = [
    { title: "Festival", image: "/Slider_img/F5.jpg" },
    { title: "Food", image: "/Slider_img/K4.jpg" },
    { title: "Place", image: "/Slider_img/P2.jpg" },
    { title: "Product", image: "/Slider_img/nature.png" },
    { title: "War_History", image: "/Slider_img/W5.jpg" },
    { title: "Origin_History", image: "/Slider_img/W6.jpg" },
    { title: "Dance", image: "/Slider_img/W6.jpg" },
    
  ];

  return (
    <Box sx={{ px: 4, py: 6, background: "linear-gradient(135deg, #e3f2fd, #ede7f6)" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: "#4A4A4A", mb: 4 }}
      >
        Discover :
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {cardDetails.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              onClick={() => navigate(`/state/${stateId}/${card.title.toLowerCase().replace(/ /g, "_")}`)}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(8px)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 30px rgba(31, 38, 135, 0.5)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.title}
                sx={{
                  objectFit: "cover",
                  transition: "opacity 0.3s ease",
                  "&:hover": { opacity: 0.9 },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "#fff", fontWeight: 600, textTransform: "capitalize" }}
                >
                  {card.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default State_Card;
