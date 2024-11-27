import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./css/SemiStateCard.css"; // Import the CSS for styling

const Semi_State_Detail_Card = () => {
  const { stateId, section } = useParams();
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${Backend_url}/state/${stateId}/${section}`);
      setSectionData(res.data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [stateId, section]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!sectionData || sectionData.length === 0) {
    return <div>No data found for this section.</div>;
  }

  const renderCard = (item, index) => {
    const descriptionClass = section === 'food' || section === 'festival' || section === 'place' ? 'card-description-left' : 'card-description-right';

    const itemId = item._id;  // Assuming the item has a unique ID field `_id`
    const detailRoute = `/details/${stateId}/${section}/${itemId}`; // Update the URL pattern as needed

    return (
      <Link to={detailRoute} key={index} className="card-link">
        <div className="card">
          <div className="card-content">
            {section === "food" && (
              <img src={item.food_image[0]} alt={item.food_name} className="card-image" />
            )}
            {section === "festival" && (
              <img src={item.festival_image} alt={item.festival_name} className="card-image" />
            )}
            {section === "place" && (
              <img src={item.place_image} alt={item.place_name} className="card-image" />
            )}
            {section === "war_history" && (
              <img
                src={item.war_image && item.war_image} // Display the first war image
                alt={item.war_name}
                className="card-image"
              />
            )}
            {section === "origin_history" && (
              <img
                src={item.origin_image && item.origin_image[0]} // Display the first origin image
                alt={item.origin_state_name}
                className="card-image"
              />
            )}
            {section === "product" && (
              <img src={item.product_image} alt={item.product_name} className="card-image" />
            )}
            <div className="card-text">
              <h3 className="card-title">
                {section === "food" && item.food_name}
                {section === "festival" && item.festival_name}
                {section === "place" && item.place_name}
                {section === "war_history" && item.event_name}
                {section === "origin_history" && item.origin_name}
                {section === "product" && item.product_name}
              </h3>
              <p className={`card-description ${descriptionClass}`}>
                {section === "food" && item.food_description}
                {section === "festival" && item.festival_description}
                {section === "place" && item.place_description}
                {section === "war_history" && item.event_description}
                {section === "origin_history" && item.origin_description}
                {section === "product" && item.product_description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button" style={{ marginBottom: "20px" }}>
        Back
      </button>
      <h1 align="center">{`${section.charAt(0).toUpperCase() + section.slice(1)}`}</h1>
      <div className="card-container">
        {sectionData.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
};

export default Semi_State_Detail_Card;
