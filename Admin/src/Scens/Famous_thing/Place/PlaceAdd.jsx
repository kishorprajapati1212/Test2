import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress 
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import axios from "axios";
import { placeTypes } from "./PlaceHome";

const PlaceAdd = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false); // Loading state


  const [placeData, setPlaceData] = useState({
    place_name: "",
    stateId: "",
    state_name: "",
    location: "", // Store latitude and longitude here as a string
    significance: [],
    builder: "",
    Period: "",
    description: "",
    place_type: "",
    place_image: [], // Store Base64 image strings
    google_map_url: "", // Google Map URL
  });

  const handleStateChange = (state) => {
    setPlaceData((prev) => ({
      ...prev,
      stateId: state.stateId,
      state_name: state.state_name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaceData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to extract latitude and longitude from Google Maps URL
  const extractLatLongFromURL = (url) => {
    const regex = /@([0-9.-]+),([0-9.-]+)/;
    const match = url.match(regex);
    if (match) {
      return {
        latitude: match[1],
        longitude: match[2],
      };
    }
    return { latitude: "", longitude: "" }; // Return empty strings if no match
  };

  // Update Google Map URL and extract latitude and longitude when URL changes
  const handleGoogleMapUrlChange = (e) => {
    const url = e.target.value;
    const { latitude, longitude } = extractLatLongFromURL(url);
    
    // Update location field with latitude and longitude
    const location = latitude && longitude ? `${latitude}, ${longitude}` : "";

    setPlaceData((prev) => ({
      ...prev,
      google_map_url: url,
      location: location, // Save the latitude and longitude in the location field
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    Promise.all(files.map((file) => convertToBase64(file)))
      .then((base64Images) => {
        setPlaceData((prev) => ({
          ...prev,
          place_image: [...prev.place_image, ...base64Images],
        }));
      })
      .catch((err) => console.error("Error converting images:", err));
  };

  const handleSubmit = async() => {
    setLoading(true); // Set loading to true

    console.log("Place Data Submitted:", placeData);
    const res = await axios.post(`${Backend_url}/Add_place`, placeData);
    console.log(res)
    if(res.status == 200){
      setLoading(false); // Set loading to false

        setPlaceData({
            place_name: "",
            stateId: "",
            state_name: "",
            location: "", // Store latitude and longitude here as a string
            significance: [],
            builder: "",
            Period: "",
            description: "",
            place_type: "",
            place_image: [], // Store Base64 image strings
            google_map_url: "", // Google Map URL
        });
    }
    setLoading(false); // Set loading to false

  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Place
      </Typography>

      <StateDropdown selectedState={placeData} onStateChange={handleStateChange} />

      <TextField
        fullWidth
        label="Heritage Title"
        name="place_name"
        value={placeData.place_name}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Google Map URL Field */}
      <TextField
        fullWidth
        label="Google Map URL"
        name="google_map_url"
        value={placeData.google_map_url}
        onChange={handleGoogleMapUrlChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Location"
        name="location"
        value={placeData.location}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Builder"
        name="builder"
        value={placeData.builder}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Period"
        name="Period"
        value={placeData.Period}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={placeData.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Place Type</InputLabel>
        <Select
          value={placeData.place_type}
          onChange={handleInputChange}
          name="place_type"
          label="Place Type"
        >
          {placeTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{ margin: "1rem 0" }}
      >
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />
      </Button>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        {placeData.place_image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`uploaded-preview-${index}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </Box>

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}
      disabled={loading} // Disable button when loading
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
      {loading ? "Submitting..." : "Submit"}
        
      </Button>
    </Box>
  );
};

export default PlaceAdd;
