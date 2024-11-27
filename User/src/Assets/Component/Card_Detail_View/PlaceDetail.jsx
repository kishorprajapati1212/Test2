import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const PlaceDetail = ({ data }) => {
  const {
    place_name,
    place_image,
    state_name,
    location,
    significance,
    builder,
    Period,
    description,
    google_map_url,
  } = data;

  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Left section with the place images */}
        <Grid item xs={12} md={5}>
          {place_image && place_image.length > 0 && (
            <Carousel>
              {place_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`${place_name} image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Right section with place details */}
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
              {place_name}
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
                {state_name && (
                  <Typography variant="body1" paragraph>
                    <strong>State:</strong> {state_name}
                  </Typography>
                )}
                {location && (
                  <Typography variant="body1" paragraph>
                    <strong>Location:</strong> {location}
                  </Typography>
                )}
                {significance && (
                  <Typography variant="body1" paragraph>
                    <strong>Significance:</strong> {significance.join(", ")}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Information
                </Typography>
                {builder && (
                  <Typography variant="body1" paragraph>
                    <strong>Builder:</strong> {builder}
                  </Typography>
                )}
                {Period && (
                  <Typography variant="body1" paragraph>
                    <strong>Period:</strong> {Period}
                  </Typography>
                )}
                {description && (
                  <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {description}
                  </Typography>
                )}
                {google_map_url && (
                  <Typography variant="body1" paragraph>
                    <strong>Google Map:</strong>{" "}
                    <a href={google_map_url} target="_blank" rel="noopener noreferrer">
                      View Location
                    </a>
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

export default PlaceDetail;
