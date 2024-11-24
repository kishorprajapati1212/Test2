import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// GeoJSON Data for Indian States
const indiaGeoJSON = {
  type: "FeatureCollection",
  features: [
    // Example for Gujarat
    {
      type: "Feature",
      properties: { name: "Gujarat" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.004, 23.639],
            [72.821, 23.019],
            [72.917, 22.256],
            [71.551, 20.676],
            [70.674, 21.749],
            [69.641, 22.187],
            [70.379, 23.023],
            [72.004, 23.639],
          ],
        ],
      },
    },
    // Example for Rajasthan
    {
      type: "Feature",
      properties: { name: "Rajasthan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [73.880, 26.449],
            [74.717, 26.449],
            [74.718, 27.092],
            [75.618, 28.646],
            [75.030, 29.353],
            [74.452, 29.344],
            [73.882, 27.559],
            [73.880, 26.449],
          ],
        ],
      },
    },
    // Add more states with accurate boundaries
  ],
};

// Generate Random Colors for States
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Define Style Function
const styleState = (feature) => ({
  fillColor: getRandomColor(), // Random color for each state
  weight: 2, // State boundary thickness
  opacity: 1, // State boundary opacity
  color: "black", // State boundary color
  fillOpacity: 0.8, // Full coverage of color
});

const WarHome = () => {
  const [center] = useState([22.0, 78.0]); // Center India on the map
  const [zoom] = useState(5); // Set an appropriate zoom level

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        {/* Map Background */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render GeoJSON for Indian States */}
        <GeoJSON data={indiaGeoJSON} style={styleState} />
      </MapContainer>
    </div>
  );
};

export default WarHome;
