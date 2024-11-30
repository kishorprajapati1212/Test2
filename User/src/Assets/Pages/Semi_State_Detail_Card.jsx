import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import "./css/SemiStateCard.css"; // Import your custom styles
import BackButton from "../Component/BackButton";

const Semi_State_Detail_Card = () => {
  const { stateId, section } = useParams();
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

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

    const itemId = item._id;
    const detailRoute = `/details/${stateId}/${section}/${itemId}`;

    return (
      <Link to={detailRoute} key={index} className="card-link" style={{ textDecoration: "none" }}>
        <Card className="flip-card" sx={{
          width: 345, 
          height: 460, 
          boxShadow: 3, 
          borderRadius: 2, 
          overflow: 'hidden', 
          transition: 'transform 0.3s ease', 
          "&:hover": { transform: "scale(1.05)" }, 
          marginBottom: 2 
        }}>
          {/* Flip Card Inner to apply 3D flip */}
          <div className="flip-card-inner">
            {/* Front side: Image and Name */}
            <div className="flip-card-front">
              <CardMedia
                component="img"
                height="200"
                image={section === "food" ? item.food_image[0]
                  : section === "festival" ? item.Festival_image[0]
                    : section === "place" ? item.place_image[0]
                      : section === "war_history" ? item.war_image
                        : section === "origin_history" ? item.origin_image[0]
                          : section === "product" ? item.product_images[0]
                            : section === "dance" ? item.dance_image[0]
                              : ""}
                alt={item.food_name || item.festival_name || item.place_name || item.war_name || item.origin_name || item.product_name || item.dance_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-end", 
                paddingBottom: 2 
              }}>
                <Typography variant="h6" sx={{
                  fontWeight: "bold", 
                  textAlign: "center", 
                  fontSize: "1.1rem", 
                  color: "#333" 
                }}>
                  {section === "food" && item.food_name}
                  {section === "festival" && item.festival_name}
                  {section === "place" && item.place_name}
                  {section === "war_history" && item.war_name.slice(0,15)}
                  {section === "origin_history" && item.origin_name}
                  {section === "product" && item.product_name}
                  {section === "dance" && item.dance_name}
                </Typography>
              </CardContent>
            </div>

            {/* Back side: Description */}
            <div className="flip-card-back">
              <CardContent sx={{ color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                  {section === "food" && item.origi_story.slice(0,100)}
                  {section === "festival" && item.festivalSignificance.slice(0,100)}
                  {section === "place" && item.Period.slice(0,100)}
                  {section === "war_history" && item.war_description.slice(0,100)}
                  {section === "origin_history" && item.origin_description.slice(0, 250)}
                  {section === "product" && item.product_description.slice(0,100)}
                  {section === "product" && item.dance_description.slice(0,100)}
                </Typography>
              </CardContent>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <BackButton />
      <h1 align="center" style={{
        marginBottom: "20px", 
        fontSize: "2rem", 
        fontWeight: "600", 
        color: "#333"
      }}>
        {`${section.charAt(0).toUpperCase() + section.slice(1)}`}
      </h1>

      {/* Grid Layout */}
      <Box sx={{
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: 3, 
        padding: 2 
      }}>
        {sectionData.map((item, index) => renderCard(item, index))}
      </Box>
    </div>
  );
};

export default Semi_State_Detail_Card;
