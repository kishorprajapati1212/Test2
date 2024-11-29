import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress 
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import axios from "axios";

const FoodAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false); // Loading state

  const [foodData, setFoodData] = useState({
    food_name: "",
    food_image: [], // Store Base64 image strings
    famous_for: "",
    recipes: "",
    famous_location: "",
    origi_story: "",
    stateId: "",
    state_name: "",
  });

  const handleStateChange = (state) => {
    setFoodData((prev) => ({
      ...prev,
      stateId: state.stateId,
      state_name: state.state_name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and convert to base64
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
        setFoodData((prev) => ({
          ...prev,
          food_image: [...prev.food_image, ...base64Images],
        }));
      })
      .catch((err) => console.error("Error converting images:", err));
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true

    console.log("Food Data Submitted:", foodData);
    const res = await axios.post(`${Backend_url}/Add_food`, foodData);
    console.log(res);
    if (res.status === 200) {
      setLoading(false); // Set loading to false

      setFoodData({
        food_name: "",
        food_image: [],
        famous_for: "",
        recipes: "",
        famous_location: "",
        origi_story: "",
        stateId: "",
        state_name: "",
      });
    }
    setLoading(false); // Set loading to false

  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Food
      </Typography>

      {/* State Dropdown */}
      <StateDropdown selectedState={foodData} onStateChange={handleStateChange} />

      {/* Food Name */}
      <TextField
        fullWidth
        label="Food Name"
        name="food_name"
        value={foodData.food_name}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Famous For */}
      <TextField
        fullWidth
        label="Famous For"
        name="famous_for"
        value={foodData.famous_for}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Recipes */}
      <TextField
        fullWidth
        label="How It's Made"
        name="recipes"
        value={foodData.recipes}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Famous Location */}
      <TextField
        fullWidth
        label="Famous Location"
        name="famous_location"
        value={foodData.famous_location}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Origin Story */}
      <TextField
        fullWidth
        label="Story of Origin"
        name="origi_story"
        value={foodData.origi_story}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Upload Food Image */}
      <Button variant="contained" component="label" fullWidth sx={{ margin: "1rem 0" }}>
        Upload Food Images
        <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
      </Button>

      {/* Preview Uploaded Images */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        {foodData.food_image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`uploaded-preview-${index}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </Box>

      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}
      disabled={loading} // Disable button when loading
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
      {loading ? "Submitting..." : "Submit"}
        
      </Button>
    </Box>
  );
};

export default FoodAdd;
