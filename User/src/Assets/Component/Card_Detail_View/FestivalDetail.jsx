import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const FestivalDetail = ({ data }) => {
  const {
    festival_name,
    festival_image,
    location,
    date,
    significance,
    description,
  } = data;

  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Left section with the festival images */}
        <Grid item xs={12} md={5}>
          {festival_image && festival_image.length > 0 && (
            <Carousel>
              {festival_image.map((image, index) => (
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
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
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
                  Summary
                </Typography>
                {location && (
                  <Typography variant="body1" paragraph>
                    <strong>Location:</strong> {location}
                  </Typography>
                )}
                {date && (
                  <Typography variant="body1" paragraph>
                    <strong>Date:</strong> {date}
                  </Typography>
                )}
                {significance && (
                  <Typography variant="body1" paragraph>
                    <strong>Significance:</strong> {significance}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Information
                </Typography>
                {description && (
                  <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {description}
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
