import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

function State() {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box> 

        {/* Festival Section */}
        <Container sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Festival: Navratri
          </Typography>
          <CardMedia
            component="img"
            image="/Photes/UT.jpg"
            alt="Navratri Festival"
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: 2,
              marginBottom: 4,
            }}
          />
          <Typography variant="h6" align="center" gutterBottom>
            Time & Duration: Oct-Dec
          </Typography>
        </Container>

        {/* Information Section */}
        <Container>
          <Typography variant="h5" gutterBottom>
            Information
          </Typography>
          <Typography paragraph>
            The nine days of Navratri are also an opportunity to rejoice in the three primeval qualities that make up the universe.
          </Typography>
          <Typography paragraph>
            Human life is governed by the three gunas and Navratri festival gives an opportunity to recognize and reflect values over it.
          </Typography>
        </Container>

        {/* Accordion Section */}
        <Container>
          {[
            { title: "Why we celebrate?", content: "We celebrate Uttarayan to mark the day when the sun begins its northward journey, signaling the arrival of warmer days, and to honor the harvest season with kite flying and festivities." },

            { title: "How we celebrate?", content: "We celebrate Uttarayan by flying kites, gathering with family and friends, enjoying traditional foods like undhiyu, and participating in lively cultural events to mark the sun's northward journey." },

            { title: "Importance", content: "Uttarayan is important as it signifies the sun's northward journey, heralding longer days, a favorable harvest season, and the start of a new cycle of warmth and prosperity." },

            { title: "Origin", content: "Uttarayan originates from ancient Hindu traditions, marking the day when the sun transitions into the northern hemisphere, considered an auspicious time for new beginnings and harvest celebrations." },
          ].map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 24, color: "#000" }}>
                  {expanded === `panel${index}` ? "▼" : "▶"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
}

export default State;
