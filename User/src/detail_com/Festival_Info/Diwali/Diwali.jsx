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
            Festival: Diwali
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
          Diwali is a vibrant Hindu festival of lights, symbolizing the triumph of good over evil and the celebration of new beginnings.
          </Typography>
          <Typography paragraph>
          Diwali holds spiritual significance as a time to cleanse the mind and soul, symbolizing the victory of inner light over darkness and ignorance.
          </Typography>
        </Container>

        {/* Accordion Section */}
        <Container>
          {[
            { title: "Why we celebrate?", content: "We celebrate Diwali to honor the victory of light over darkness and good over evil, symbolizing new beginnings and the blessings of prosperity." },

            { title: "How we celebrate?", content: "We celebrate Diwali by decorating homes with lights, offering prayers, exchanging gifts, and bursting fireworks to mark the triumph of good over evil." },

            { title: "Importance", content: "Diwali is important as it symbolizes the victory of good over evil, light over darkness, and the renewal of hope, prosperity, and spiritual growth." },

            { title: "Origin", content: "Diwali originated from ancient Hindu mythology, celebrating the return of Lord Rama to Ayodhya after defeating the demon king Ravana." },
            
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
