import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Configure Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MapFilter from "./MapFilter";

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

const Maphome = () => {
  const [selectedBaseMap, setSelectedBaseMap] = useState("OpenStreetMap");
  const [filteredPlaces, setFilteredPlaces] = useState([]); // State for filtered places

  const handleBaseMapChange = (event) => {
    setSelectedBaseMap(event.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {/* MapFilter Component */}
      <MapFilter setFilteredPlaces={setFilteredPlaces} />

      {/* Map Container */}
      <MapContainer
        center={[22.308155, 70.800705]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={baseMaps[selectedBaseMap]}
        />

        {/* Dynamic Markers Based on Filtered Places */}
        {filteredPlaces.map((place, index) => (
          <Marker
            key={index}
            position={place.location.split(",").map(Number)} // Convert "lat,lon" to [lat, lon]
          >
            <Popup>
              <strong>{place.place_name.slice(0, 16)}</strong>
              <br />
              {place.description
              .slice(0,80)
                .match(/.{1,25}/g) // Split the description into chunks of 5 characters
                .map((chunk, index) => (
                  <React.Fragment key={index}>
                    {chunk}
                    <br />
                  </React.Fragment>
                ))}
              <br />
              <a
                href={place.google_map_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
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

export default Maphome;
