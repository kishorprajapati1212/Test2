import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const FestivalDetail = ({ data }) => {
  const {
    festival_name,
    Festival_image,
    location,
    festival_startDate,
    festival_endDate,
    significance,
    celebrationMethods,
    celebrationReason,
    festivalSignificance,
    originLocation,
  } = data;

  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <Grid container spacing={3}>
        {/* Left section with the festival images */}
        <Grid item xs={12} md={5}>
          {Festival_image && Festival_image.length > 0 && (
            <Carousel
            autoPlay={true} // Enable auto slide
            interval={5000} // Time between slides in ms (5 seconds here)
            infiniteLoop={true} // Loop the carousel infinitely
            showArrows={false} // Optionally hide navigation arrows
            showThumbs={false} // Optionally hide thumbnails
            swipeable={true} // Allow swiping if on mobile devices
            transitionTime={1000} // Time for transition between slides (1 second here)
            dynamicHeight={true} // Adjusts the height of carousel dynamically to the images
            >
              {Festival_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`${festival_name} image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Right section with festival details */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: 3,
              minHeight: "400px",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
              {festival_name}
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            <Button
              variant="contained"
              color="primary"
              onClick={toggleView}
              sx={{ marginBottom: "20px" }}
            >
              {showSummary ? "Show Details" : "Show Summary"}
            </Button>

            {showSummary ? (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Festival Overview
                </Typography>
                {location && (
                  <Typography variant="body1" paragraph>
                    <strong>Location:</strong> {location}
                  </Typography>
                )}
                {festival_startDate && festival_endDate && (
                  <Typography variant="body1" paragraph>
                    <strong>Date:</strong> {new Date(festival_startDate).toLocaleDateString()} -{" "}
                    {new Date(festival_endDate).toLocaleDateString()}
                  </Typography>
                )}
                {significance && (
                  <Typography variant="body1" paragraph>
                    <strong>Significance:</strong> {significance}
                  </Typography>
                )}
                {celebrationReason && (
                  <Typography variant="body1" paragraph>
                    <strong>Reason for Celebration:</strong> {celebrationReason}
                  </Typography>
                )}
                {originLocation && (
                  <Typography variant="body1" paragraph>
                    <strong>Origin Location:</strong> {originLocation}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Information
                </Typography>
                {celebrationMethods && (
                  <Typography variant="body1" paragraph>
                    <strong>Celebration Methods:</strong> <br /> {celebrationMethods.split("\no\t").join("\n")}
                  </Typography>
                )}
                {festivalSignificance && (
                  <Typography variant="body1" paragraph>
                    <strong>Festival Significance:</strong> {festivalSignificance}
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

export default FestivalDetail;
