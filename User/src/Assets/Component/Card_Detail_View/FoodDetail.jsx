import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Button } from "@mui/material";
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

  // State to manage which section (Summary or Detail) is visible
  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Left section with the food images */}
        <Grid item xs={12} md={5}>
          {/* Display multiple images using carousel */}
          {food_image && food_image.length > 0 && (
            <Carousel>
              {food_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`${food_name} image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
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
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
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
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Summary
                </Typography>
                {famous_for && (
                  <Typography variant="body1" paragraph>
                    <strong>Famous For:</strong> {famous_for}
                  </Typography>
                )}

                {famous_location && (
                  <Typography variant="body1" paragraph>
                    <strong>Famous Location:</strong> {famous_location}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box>
                {/* Detail Section */}
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Information
                </Typography>
                {recipes && (
                  <Typography variant="body1" paragraph>
                    <strong>Recipes:</strong> {recipes}
                  </Typography>
                )}

                {origi_story && (
                  <Typography variant="body1" paragraph>
                    <strong>Origin Story:</strong> {origi_story}
                  </Typography>
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
