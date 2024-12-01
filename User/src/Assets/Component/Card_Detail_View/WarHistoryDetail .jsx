import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for accordion

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

  // Function to replace '//' with line breaks
  const formatDescription = (description) => {
    return description.split("//").map((line, index) => (
      <span key={index}>
        {line}
        {index !== description.split("//").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Full-width section for the carousel */}
        <Grid item xs={12}>
          {/* Display the war images using carousel */}
          <Carousel>
            <div>
              <CardMedia
                component="img"
                height="500"
                image={war_image} // Directly use the base64 image string here
                sx={{
                  borderRadius: "8px",
                  boxShadow: 3,
                  width: "100%", // Ensures it takes full width
                  objectFit: "cover",
                }}
              />
            </div>
          </Carousel>
        </Grid>

        {/* Full-width section for war details */}
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
              {war_name}
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* Display simple details without accordion */}
            <Typography variant="body1" paragraph>
              <strong>State:</strong> {state_name}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Time Period:</strong> {start_war} - {end_war}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Location:</strong> {war_place}
            </Typography>

            {/* Only use Accordion for detailed sections */}
            {war_between && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>War Between</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {formatDescription(war_between)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {war_winner && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Winner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {war_winner}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {war_reason && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Reason</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {war_reason}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {war_losses && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>Losses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {war_losses}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {war_description && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {formatDescription(war_description)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WarHistoryDetail;
