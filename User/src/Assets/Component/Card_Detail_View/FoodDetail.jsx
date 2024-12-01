import React from "react";
import { Grid, Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const FoodDetail = ({ data }) => {
  const {
    food_name,
    food_image,
    famous_for,
    recipes,
    famous_location,
    origin_story,
  } = data;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <Grid container spacing={3}>
        {/* Full Width Image Slider */}
        <Grid item xs={12}>
          {food_image && food_image.length > 0 && (
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
              {food_image.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${food_name} image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "350px", // Set a fixed height for the slider images
                      objectFit: "cover", // Ensure the image covers the area without stretching
                      borderRadius: "8px",
                      boxShadow: 3,
                    }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Food Overview Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
            {food_name}
          </Typography>

          <Divider sx={{ marginBottom: "20px" }} />

          {/* Food Summary */}
          <Box>
            <Typography variant="body1" paragraph>
              <strong>Famous Location:</strong> {famous_location}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Details Section - accordion */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Ingredients */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
              <Typography variant="h6">Ingredients</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {recipes || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Origin Story */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
              <Typography variant="h6">Origin Story</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {origin_story || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Famous Location */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
              <Typography variant="h6">Famous For</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {famous_for || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Famous For */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header">
              <Typography variant="h6">Famous For</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {famous_for || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FoodDetail;
