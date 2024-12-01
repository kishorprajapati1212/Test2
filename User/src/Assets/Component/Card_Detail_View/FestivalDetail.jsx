import React from "react";
import { Grid, Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <Grid container spacing={3}>
        {/* Left section with the festival images */}
        <Grid item xs={12}>
          {Festival_image && Festival_image.length > 0 && (
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
              {Festival_image.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${festival_name} image ${index + 1}`}
                    style={{ width: "100%", borderRadius: "8px", boxShadow: 3,height: "350px",objectFit: "cover", }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Grid>

        {/* Festival Overview Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
            {festival_name}
          </Typography>

          <Divider sx={{ marginBottom: "20px" }} />

          {/* Festival Summary */}
          <Box>
            <Typography variant="body1" paragraph>
              <strong>Location:</strong> {originLocation}
            </Typography>
            {festival_startDate && festival_endDate && (
              <Typography variant="body1" paragraph>
                <strong>Date:</strong> {new Date(festival_startDate).toLocaleDateString()} -{" "}
                {new Date(festival_endDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Details Section - celebration methods, significance, reason, etc. */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {/* Celebration Methods */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6">Celebration Methods</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {celebrationMethods || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Significance */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h6">Festival Significance</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {festivalSignificance || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Celebration Reason */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography variant="h6">Celebration Reason</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {celebrationReason || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Festival Origin */}
        <Grid item xs={12} md={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography variant="h6">Festival Origin</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {originLocation || "No details available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FestivalDetail;
