// src/components/State_Card.jsx
import React, { useEffect, useState } from "react";
import "../../Pages/css/home.css";
import "./css/Card.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const State_Card = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const stateId = useParams().stateId;
  const [stateData, setStateData] = useState(null);
  const navigate = useNavigate();

  // Dynamic card titles and image data
  const cardDetails = [
    { title: "Festival", image:  "/Slider_img/F5.jpg" },
    { title: "Food", image:  "/Slider_img/K4.jpg" },
    { title: "Place", image:  "/Slider_img/P2.jpg" },
    { title: "Product", image:  "/Slider_img/nature.png" },
    { title: "war_history", image:  "/Slider_img/W5.jpg" },
    { title: "origin_history", image:  "/Slider_img/W6.jpg" },
  ];

  return (
    <>
      {/* State Information Section */}

      {/* Cards Section */}
      <div className="row" style={{height:"10%"}}>
        {cardDetails.map((card, index) => (
          <div key={index} className="column">
            <div
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/state/${stateId}/${card.title.toLowerCase()}`)}
            >
              <img src={card.image} style={{ width: "70%" }} alt={card.title} />
              <h2 style={{ color: "black", fontWeight: 50 }}>{card.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default State_Card;
