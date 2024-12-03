import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const Formate2 = () => {
  const state_description = `
    Himachal Pradesh

    @ State Description:Himachal Pradesh, a northern state in India, is known for its diverse geography, rich cultural heritage, and socio-economic importance. Here is a simplified research-focused description:
    # Geography and ClimateHimachal Pradesh lies in the western Himalayas and covers an area of 55,673 square kilometers. It is bordered by Jammu and Kashmir, Punjab, Haryana, Uttarakhand, and Tibet. Key features include:
    •	/Mountain Ranges: Dhauladhar, Pir Panjal, and the Great Himalayas.•	/Rivers: Beas, Sutlej, Ravi, and Chenab originate here.
    •	/Climate Zones: Ranges from subtropical in the lowlands to alpine in the high altitudes, promoting biodiversity.
    #Biodiversity
    Himachal is part of the Himalayan biodiversity hotspot, with:
    •	/Forests: Deodar, pine, oak, and rhododendron.
    •	/Wildlife: Snow leopard, Himalayan tahr, and musk deer. Key protected areas include the Great Himalayan National Park, a UNESCO World Heritage Site.
    #Demographics and Culture
    •	/Population: Approximately 7.3 million (Census 2011), with over 82% literacy.
    •	/Languages: Hindi is official; Pahari dialects are widely spoken.
    •	/Religion: Mostly Hindu, with Buddhist influence in areas like Lahaul-Spiti.
    •	/Festivals: Major ones include Kullu Dussehra, Shivratri, and Losar (Buddhist New Year).
  `;

  const processDescription = (text) => {
    return text.split("\n").map((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("@")) {
        return (
          <Typography variant="h4" gutterBottom key={index}>
            {trimmedLine.slice(1).trim()}
          </Typography>
        ); // Main title
      }
      if (trimmedLine.startsWith("#")) {
        return (
          <Typography variant="h5" gutterBottom key={index}>
            {trimmedLine.slice(1).trim()}
          </Typography>
        ); // Section title
      }
      if (trimmedLine.startsWith("•")) {
        return (
          <List key={index}>
            <ListItem>
              <ListItemText
                primary={trimmedLine.slice(1).replace("/", "").trim()}
              />
            </ListItem>
          </List>
        ); // Subpoint as list
      }
      if (trimmedLine.startsWith("*")) {
        return (
          <Typography variant="body1" key={index}>
            {trimmedLine.slice(1).trim()}
          </Typography>
        ); // List item text
      }
      if (trimmedLine.startsWith("/")) {
        return (
          <Typography variant="body2" style={{ marginLeft: "20px" }} key={index}>
            {trimmedLine.slice(1).trim()}
          </Typography>
        ); // Indented sub-details
      }
      return trimmedLine ? (
        <Typography variant="body1" key={index}>
          {trimmedLine}
        </Typography>
      ) : null; // Regular text
    });
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Himachal Pradesh - A Research Overview
      </Typography>
      {processDescription(state_description)}
    </Container>
  );
};

export default Formate2;
