import React from "react";
import { Box, Grid, Typography, Paper, CardMedia, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  // Format the description by breaking down sections
  const formatDescription = (description) => {
    return description
      .split("\n")
      .map((line, index) => (
        <Typography variant="body1" paragraph key={index}>
          {line}
        </Typography>
      ));
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Full Width Section: Carousel */}
        <Grid item xs={12}>
          {origin_image && origin_image.length > 0 && (
            <Carousel
              autoPlay={true}
              interval={5000}
              infiniteLoop={true}
              showArrows={false}
              showThumbs={false}
              swipeable={true}
              transitionTime={1000}
              dynamicHeight={true}
            >
              {origin_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={image}
                    alt={`Origin Image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Right Section: Details (below slider) */}
        <Grid item xs={12} >
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
              <strong>Today's Status:</strong> {today_Status || "N/A"}
            </Typography>

            {/* Accordion for Description */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h6">Origin Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {formatDescription(origin_description)}
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OriginDetail;
