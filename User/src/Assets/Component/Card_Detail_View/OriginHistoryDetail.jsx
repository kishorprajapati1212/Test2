import React, { useState } from "react";
import { Box, Grid, Typography, Paper, Button, CardMedia, Divider } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const OriginDetail = ({ data }) => {
  const {
    origin_description,
    origin_image,
    origin_state_name,
    origin_time,
    state_name,
    today_Status,
  } = data;

  // State to toggle between summary and detailed views
  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Left Section: Images */}
        <Grid item xs={12} md={5}>
          {origin_image && origin_image.length > 0 && (
            <Carousel>
              {origin_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`Origin Image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Right Section: Details */}
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
              Origin Details: {state_name}
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />

            {/* Metadata */}
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <strong>Origin State Name:</strong> {origin_state_name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <strong>Origin Year:</strong> {origin_time}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
              <strong>Today's Status:</strong> {today_Status}
            </Typography>

            {/* Toggle Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={toggleView}
              sx={{ marginBottom: "20px" }}
            >
              {showSummary ? "Show Detailed Description" : "Show Summary"}
            </Button>

            {/* Conditional Rendering: Summary or Detailed Description */}
            {showSummary ? (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  {origin_description?.split("\n").slice(0, 3).join(" ")}...
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {origin_description}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OriginDetail;
