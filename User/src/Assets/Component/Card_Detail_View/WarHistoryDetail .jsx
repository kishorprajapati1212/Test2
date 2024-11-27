import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  CardMedia,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const WarHistoryDetail = ({ data }) => {
  const {
    war_name,
    war_image,
    state_name,
    start_war,
    end_war,
    war_place,
    war_between,
    war_winner,
    war_reason,
    war_losses,
    war_description,
  } = data;

  const [showSummary, setShowSummary] = useState(true);

  const toggleView = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Left section with the war images */}
        <Grid item xs={12} md={5}>
          {/* Display multiple images using carousel */}
          
            <Carousel>
              
                <div >
                  <CardMedia
                    component="img"
                    height="300"
                    image={war_image}
                    // alt={`${war_name} image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              
            </Carousel>
          
        </Grid>

        {/* Right section with war details */}
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
              {war_name}
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
                <Typography variant="body1" paragraph>
                  <strong>State:</strong> {state_name}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Time Period:</strong> {start_war} - {end_war}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Location:</strong> {war_place}
                </Typography>
              </Box>
            ) : (
              <Box>
                {/* Detail Section */}
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Detailed Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>War Between:</strong> {war_between}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Winner:</strong> {war_winner}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Reason:</strong> {war_reason}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Losses:</strong> {war_losses}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Description:</strong> {war_description}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WarHistoryDetail;
