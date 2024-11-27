// src/components/State_Information.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const cleanDescription = (description) => {
  // Remove <br /> tags and extra whitespaces
  return description.replace(/<br\s*\/?>/g, ' ').replace(/\s+/g, ' ').trim();
};

const State_Information = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const stateId = useParams().stateId;
  const [stateData, setStateData] = useState(null);

  const fetchStateData = async () => {
    try {
      const res = await axios.get(`${Backend_url}/One_state_with_all_image/${stateId}`);
      console.log(res.data); // Check the structure of the response
      setStateData(res.data[0]);
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  useEffect(() => {
    fetchStateData();
  }, [stateId]);

  if (!stateData) {
    return <div>Loading...</div>;
  }

  const descriptionSections = [
    {
      title: "Geography and Climate",
      content: cleanDescription(stateData.state_description.split("Geography and Climate")[1]?.split("Biodiversity")[0] || ""),
    },
    {
      title: "Biodiversity",
      content: cleanDescription(stateData.state_description.split("Biodiversity")[1]?.split("Demographics and Culture")[0] || ""),
    },
    {
      title: "Demographics and Culture",
      content: cleanDescription(stateData.state_description.split("Demographics and Culture")[1]?.split("Economy")[0] || ""),
    },
    {
      title: "Economy",
      content: cleanDescription(stateData.state_description.split("Economy")[1]?.split("Education and Development")[0] || ""),
    },
    {
      title: "Education and Development",
      content: cleanDescription(stateData.state_description.split("Education and Development")[1]?.split("Challenges")[0] || ""),
    },
    {
      title: "Challenges",
      content: cleanDescription(stateData.state_description.split("Challenges")[1]?.split("Research Potential")[0] || ""),
    },
    {
      title: "Research Potential",
      content: cleanDescription(stateData.state_description.split("Research Potential")[1] || ""),
    }
  ];

  return (
    <div className="about">
      <h4>About {stateData.state_name}:</h4>
      {descriptionSections.slice(1).map((section, index) => (
        <div key={index}>
          <h4>{section.title}:</h4>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default State_Information;
