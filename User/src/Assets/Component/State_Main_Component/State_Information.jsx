import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { useLanguage } from "../../../Language";
import { translateText } from "../../Actions/translateText";
import Formate from "./Formate";

const State_Information = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const { language } = useLanguage();
  const stateId = useParams().stateId;
  const [stateData, setStateData] = useState(null);
  const [translatedData, setTranslatedData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch state data from the backend
  const fetchStateData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Backend_url}/One_state_with_all_image/${stateId}`);
      setStateData(res.data[0]);
    } catch (error) {
      console.error("Error fetching state data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle translation of content based on selected language
  const translateContent = async (content) => {
    try {
      const response = await translateText(content, language);
      const translatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (translatedText) {
        setTranslatedData(translatedText);
      } else {
        console.error("Invalid translation response structure:", response);
      }
    } catch (error) {
      console.error("Error translating content:", error);
    }
  };

  // Fetch the state data on component mount or when the stateId changes
  useEffect(() => {
    fetchStateData();
  }, [stateId]);

  // Handle translation when language or stateData changes
  useEffect(() => {
    if (stateData && language !== "en") {
      translateContent(stateData.state_description);
    } else {
      setTranslatedData(null);
    }
  }, [stateData, language]);

  // Display loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle case where state data is not available
  if (!stateData) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const description = translatedData || stateData.state_description;

  // Process and format description
  const formattedDescription = description
    .replace(/[@]/g, "") // Remove @ for titles
    .replace(/[*•]/g, "") // Remove all bullet symbols
    .replace(/#\s?/g, "\n\n") // Format main sections as headers
    .replace(/\/\s?/g, "\n- ") // Format subpoints as sub-list items
    .replace(/\n\s*\n/g, "\n\n"); // Ensure consistent spacing

  return (
    <Box className="about" sx={{ padding: "20px", fontFamily: "Roboto, Arial, sans-serif" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#2E3B55", fontWeight: "700" }}>
        About {stateData.state_name}:
      </Typography>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <Box sx={{ flex: 2 }}>
          {/* <Typography variant="h5" sx={{ color: "black", fontWeight: "600" }}>
            NickName:- <span style={{ fontStyle: "italic", color: "grey" }}>{stateData.state_nickname}</span>
          </Typography> */}
          <Typography variant="h6" sx={{ marginTop: "1px", textAlign: "left", }}>
            Direction: {stateData.state_direction}
          </Typography>
          <br />
          
          {/* Show the formatted description */}
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", fontFamily: "Arial, sans-serif" }}>
            {formattedDescription.substring(0, showMore ? description.length : 500)}
          </div>
          {/* <Formate state_description={description}  /> */}


          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outlined"
              sx={{
                padding: "8px 20px",
                backgroundColor: "transparent",
                borderColor: "#007BFF",
                color: "#007BFF",
                borderRadius: "25px",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#007BFF",
                  color: "white",
                },
                boxShadow: showMore ? "0 4px 12px rgba(0, 123, 255, 0.3)" : "none",
                transform: showMore ? "scale(1.05)" : "none",
              }}
            >
              {showMore ? "Show Less" : "Read More"}
            </Button>
          </Box>

          {showMore && (
            <Box sx={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                href="https://www.irctc.co.in/"
                target="_blank"
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  width: "50%",
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "25px",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#c40000",
                  },
                }}
              >
                Book Now
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          {stateData.state_images && stateData.state_images.length > 0 ? (
            <img
              src={stateData.state_images[0]}  // Assuming the first image in the array is the one you want to show
              alt="State"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ccc",
              }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default State_Information;
