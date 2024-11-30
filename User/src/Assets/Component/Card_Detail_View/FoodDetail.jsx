import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Button, Chip } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

// This is the component for displaying food details
const FoodDetail = ({ data }) => {
  const {
    food_name,
    food_image,
    famous_for,
    recipes,
    famous_location,
    origi_story,
  } = data;

  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "40px", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        {/* Left section with the food images */}
        <Grid item xs={12} md={5}>
          {/* Display multiple images using carousel */}
          {food_image && food_image.length > 0 && (
            <Carousel
              autoPlay={true}
              interval={4000}
              infiniteLoop={true}
              showArrows={false}
              showThumbs={false}
              swipeable={true}
              dynamicHeight={true}
            >
              {food_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={image}
                    alt={`${food_name} image ${index + 1}`}
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Right section with food name and details */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              padding: "30px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
              minHeight: "450px",
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "600", color: "#2c3e50" }}>
              {food_name}
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* Toggle between Summary and Detailed Information */}
            <Button
              variant="contained"
              color="primary"
              onClick={toggleView}
              sx={{ marginBottom: "20px" }}
            >
              {showSummary ? "Show Details" : "Show Summary"}
            </Button>

            {/* Conditional rendering based on showSummary state */}
            {showSummary ? (
              <Box>
                {/* Summary Section */}
                <Typography variant="h6" sx={{ fontWeight: "600", marginBottom: "10px", color: "#333" }}>
                  Summary
                </Typography>
                {famous_for && (
                  <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
                    <strong>Famous For:</strong> {famous_for}
                  </Typography>
                )}

                {famous_location && (
                  <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
                    <strong>Famous Location:</strong> {famous_location}
                  </Typography>
                )}
                <Chip
                  label="Himachal Pradesh"
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#1976d2",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontWeight: "600",
                  }}
                />
              </Box>
            ) : (
              <Box>
                {/* Detail Section */}
                <Typography variant="h6" sx={{ fontWeight: "600", marginBottom: "10px", color: "#333" }}>
                  Detailed Information
                </Typography>
                {recipes && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                      Ingredients:
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
                      {recipes.split("\no\t").map((recipe, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ fontSize: "1rem" }}>
                          - {recipe}
                        </Typography>
                      ))}
                    </Typography>
                  </Box>
                )}

                {origi_story && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                      Origin Story:
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
                      {origi_story}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FoodDetail;
