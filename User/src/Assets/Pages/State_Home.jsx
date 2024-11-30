import React from "react";
import { useNavigate } from "react-router-dom";  // Importing useNavigate from react-router-dom
import State_Card from "../Component/State_Main_Component/State_Card";
import State_Information from "../Component/State_Main_Component/State_Information";
import State_Slide from "../Component/State_Main_Component/State_Slider";
import { Button, Box } from "@mui/material"; // Importing MUI Button
import BackButton from "../Component/BackButton";


const State_Home = () => {
  return (
    <>
      {/* Back Button */}
      <BackButton />

      {/* Other Components */}
      <State_Slide />
      <State_Information />
      <State_Card />
    </>
  );
};

export default State_Home;
