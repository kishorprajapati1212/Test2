import "./css/Attr.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Attraction = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [attractions, setAttractions] = useState([]); // State to store fetched attractions

  // Fetch attractions from the API
  const fetchPlace = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Home_Page_Attractions`);
      setAttractions(res.data); // Update attractions state
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  useEffect(() => {
    fetchPlace(); // Fetch data on component mount
  }, []);

  return (
    <div className="Attr-container">
      <h1 className="Attr-heading">Attractions</h1>
      <div className="Attr-card-container">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="Attr-card"
            style={{
              backgroundImage: `url(${attraction.place_image[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="Attr-card-content">
              <h2 className="Attr-card-title">{attraction.place_name}</h2>
              <p className="Attr-card-body">
                {attraction.description.length > 50
                  ? `${attraction.description.substring(0, 50)}...`
                  : attraction.description}
              </p>
              <Link
                to={`/details/${attraction.stateId}/place/${attraction._id}`}
                className="Attr-button"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attraction;
