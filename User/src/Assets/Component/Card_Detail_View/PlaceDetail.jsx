import React from "react";
import { Grid, Typography, Paper, Box, Divider, CardMedia, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    HeritageId,
  } = data;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Full Width Section: Carousel */}
        <Grid item xs={12}>
          {place_image && place_image.length > 0 && (
            <Carousel autoPlay interval={3000} infiniteLoop>
              {place_image.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={image}
                    alt={`${place_name} image ${index + 1}`}
                    sx={{ borderRadius: "8px", boxShadow: 3 }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Full Width Section: Details (below carousel) */}
        <Grid item xs={12}>
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

            {/* Accordion for Metadata */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h6">Place Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                {significance && significance.length > 0 && (
                  <Typography variant="body1" paragraph>
                    <strong>Significance:</strong> {significance.join(", ")}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>


            {/* Accordion for Period */}
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="h6">Period</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  <strong>Period:</strong> {Period}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Accordion for Builder */}
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography variant="h6">Builder</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  <strong>Builder:</strong> {builder}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Accordion for Description */}
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                <Typography variant="h6">Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  {description}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Google Maps URL */}
            {google_map_url && (
              <Box sx={{ marginTop: "20px" }}>
                {/* <Typography variant="h6">View on Google Maps</Typography> */}
                <a href={google_map_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                    Open Map
                  </Button>
                </a>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceDetail;
