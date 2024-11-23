import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Configure Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet icon setup
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Base map URLs
const baseMaps = {
  OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

// Sample static data for Gujarat heritage places with Google Maps URLs
const heritagePlaces = [
  {
    name: "Rani Ki Vav",
    description:
      "Rani Ki Vav is a stepwell situated in Patan, Gujarat. It is a UNESCO World Heritage Site known for its intricate architecture.",
    position: [23.8521, 72.1457],
    googleMapsUrl:
      "https://www.google.com/maps/place/Rani+Ki+Vav/@23.8521,72.1457",
  },
  {
    name: "Sun Temple",
    description:
      "The Sun Temple in Modhera, Gujarat, is dedicated to the solar deity Surya and is known for its stunning architecture and historical significance.",
    position: [23.5786, 72.6277],
    googleMapsUrl:
      "https://www.google.com/maps/place/Sun+Temple/@23.5786,72.6277",
  },
  {
    name: "Sardar Vallabhbhai Patel Statue",
    description:
      "The Statue of Unity, located in the Narmada district of Gujarat, is the world's tallest statue, honoring Sardar Vallabhbhai Patel.",
    position: [21.8389, 73.7197],
    googleMapsUrl:
      "https://www.google.com/maps/place/Statue+of+Unity/@21.8389,73.7197",
  },
  {
    name: "Somnath Temple",
    description:
      "Somnath Temple, located in Prabhas Patan near Veraval, is one of the 12 Jyotirlinga shrines of Lord Shiva and is a significant pilgrimage site.",
    position: [20.8986, 70.4014],
    googleMapsUrl:
      "https://www.google.com/maps/place/Somnath+Temple/@20.8986,70.4014",
  },
];

const WarHome = () => {
  const [selectedBaseMap, setSelectedBaseMap] = useState("OpenStreetMap");

  // Handle base map selection change
  const handleBaseMapChange = (event) => {
    setSelectedBaseMap(event.target.value);
  };

  // Debugging effect: Will log whenever selectedBaseMap or heritagePlaces changes
  useEffect(() => {
    console.log("Base Map Selected:", selectedBaseMap); // Logs selected base map every time it changes
    console.log("Heritage Places for Markers:", heritagePlaces); // Logs the heritage places for markers
  }, [selectedBaseMap, heritagePlaces]); // Tracks changes in base map selection and heritage places

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        position: "relative",
      }}
    >
      <MapContainer
        center={[22.308155, 70.800705]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          // Debugging log when the map is created
          console.log("Leaflet Map Object:", map);
        }}
      >
        {/* Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={baseMaps[selectedBaseMap]}
          // Debugging log for TileLayer loading
          onTileLoad={() =>
            console.log("Tile layer loaded with URL:", baseMaps[selectedBaseMap])
          }
        />

        {/* Display Static Markers for Gujarat Heritage Places */}
        {heritagePlaces.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <strong>{marker.name}</strong>
              <br />
              {marker.description}
              <br />
              <a
                href={marker.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </Popup>
          </Marker>
        ))}

        {/* Draw Controls */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={(e) => {
              // Debugging log for drawing new shapes
              console.log("Drawn shape:", e.layer.toGeoJSON());
            }}
            draw={{
              rectangle: true,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Base Map Selector */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label>Base Map:</label>
        <select
          value={selectedBaseMap}
          onChange={handleBaseMapChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
        >
          {Object.keys(baseMaps).map((mapName) => (
            <option key={mapName} value={mapName}>
              {mapName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WarHome;
