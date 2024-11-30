import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useLanguage } from "../../../Language";
import { translateText } from "../../Actions/translateText";

const cleanDescription = (description) => {
  return description
    ? description.replace(/<br\s*\/?>/g, " ").replace(/\s+/g, " ").trim()
    : "";
};

const parseToList = (content) => {
  const lines = content
    .split(/(?:•|(?=\d\.\s))/)
    .map((item) => item.trim())
    .filter((item) => item);
  return lines.map((line) => {
    const isNumbered = /^\d+\.\s/.test(line);
    const text = isNumbered ? line.replace(/^\d+\.\s/, "") : line;
    return { isNumbered, text };
  });
};

const extractSectionContent = (description, section, nextSection) => {
  if (typeof description !== "string") return "";
  const startIndex = description.indexOf(section);
  const endIndex = nextSection ? description.indexOf(nextSection) : description.length;

  if (startIndex === -1) {
    return "";
  }

  return cleanDescription(description.substring(startIndex + section.length, endIndex));
};

const splitContentIntoSections = (description) => {
  if (typeof description !== "string") return [];
  const sections = description.split(/\n\n+/).map((section) => section.trim());
  return sections.map((section) => ({
    title: section.split(":")[0].trim(),
    content: section.split(":").slice(1).join(":").trim(),
  }));
};

const State_Information = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const { language } = useLanguage();
  const stateId = useParams().stateId;
  const [stateData, setStateData] = useState(null);
  const [translatedData, setTranslatedData] = useState(null);

  const fetchStateData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/One_state_with_all_image/${stateId}`);
      console.log("dtata" ,res.data)
      setStateData(res.data[0]);

    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  const translateContent = async (content) => {
    try {
      const response = await translateText(content, language);
  
      // Extract the translated text based on the response structure
      const translatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (translatedText) {
        setTranslatedData(translatedText); // Save the extracted translated text
      } else {
        console.error("Invalid translation response structure:", response);
      }
    } catch (error) {
      console.error("Error translating content:", error);
    }
  };
  

  useEffect(() => {
    fetchStateData();
  }, [stateId]);

  useEffect(() => {
    if (stateData && language !== "en") {
      translateContent(stateData.state_description); // Translate the full description
    } else {
      setTranslatedData(null); // Reset if the language is English
    }
  }, [stateData, language]);

  if (!stateData) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const sectionsOrder = [
    { title: "Geography and Climate", next: "Biodiversity" },
    { title: "Biodiversity", next: "Demographics and Culture" },
    { title: "Demographics and Culture", next: "Economy" },
    { title: "Economy", next: "Education and Development" },
    { title: "Education and Development", next: "Challenges" },
    { title: "Challenges", next: "Research Potential" },
    { title: "Research Potential", next: null },
  ];

  const description = translatedData || stateData.state_description; // Use translated data if available

  const descriptionSections =
    language === "en"
      ? sectionsOrder.map(({ title, next }) => {
          const content = extractSectionContent(description, title, next);
          return content ? { title, content } : null;
        }).filter(Boolean)
      : splitContentIntoSections(description); // For non-English languages

  return (
    <Box className="about" sx={{ padding: "20px", fontFamily: "Roboto, Arial, sans-serif" }}>
      <Typography variant="h4" gutterBottom>
        About {stateData.state_name}:
      </Typography>
      {descriptionSections.map((section, index) => (
        <Box key={index} sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#2E3B55", fontWeight: "600" }}>
            {section.title}:
          </Typography>
          <ul style={{ paddingLeft: "40px" }}>
            {parseToList(section.content).map((item, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "8px",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  fontWeight: item.isNumbered ? "500" : "400",
                  listStyleType: item.isNumbered ? "decimal" : "circle",
                }}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default State_Information;
