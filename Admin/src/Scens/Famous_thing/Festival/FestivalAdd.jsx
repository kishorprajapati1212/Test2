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

const FestivalAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false); // Loading state

  const [festivalData, setFestivalData] = useState({
    festival_name: "",
    Festival_image: [], // Store Base64 image strings
    festival_startDate: "",
    festival_endDate: "",
    celebrationReason: "",
    celebrationMethods: "",
    festivalSignificance: "",
    originLocation: "",
    stateId: "",
    state_name: "",
  });

  const handleStateChange = (state) => {
    setFestivalData((prev) => ({
      ...prev,
      stateId: state.stateId,
      state_name: state.state_name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestivalData((prev) => ({ ...prev, [name]: value }));
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
        setFestivalData((prev) => ({
          ...prev,
          Festival_image: [...prev.Festival_image, ...base64Images],
        }));
      })
      .catch((err) => console.error("Error converting images:", err));
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true

    console.log("Festival Data Submitted:", festivalData);
    const res = await axios.post(`${Backend_url}/Add_festival`, festivalData);
    console.log(res);
    if (res.status === 200) {
      setLoading(false); // Set loading to false

      setFestivalData({
        festival_name: "",
        Festival_image: [],
        festival_startDate: "",
        festival_endDate: "",
        celebrationReason: "",
        celebrationMethods: "",
        festivalSignificance: "",
        originLocation: "",
        stateId: "",
        state_name: "",
      });
    }
    setLoading(false); // Set loading to false

  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Festival
      </Typography>

      {/* State Dropdown */}
      <StateDropdown selectedState={festivalData} onStateChange={handleStateChange} />

      {/* Festival Name */}
      <TextField
        fullWidth
        label="Festival Name"
        name="festival_name"
        value={festivalData.festival_name}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Start Date */}
      <TextField
        fullWidth
        label="Start Date"
        name="festival_startDate"
        type="date"
        value={festivalData.festival_startDate}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* End Date */}
      <TextField
        fullWidth
        label="End Date"
        name="festival_endDate"
        type="date"
        value={festivalData.festival_endDate}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* Celebration Reason */}
      <TextField
        fullWidth
        label="Reason for Celebration"
        name="celebrationReason"
        value={festivalData.celebrationReason}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Celebration Methods */}
      <TextField
        fullWidth
        label="How It's Celebrated"
        name="celebrationMethods"
        value={festivalData.celebrationMethods}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Festival Significance */}
      <TextField
        fullWidth
        label="Festival Significance"
        name="festivalSignificance"
        value={festivalData.festivalSignificance}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Origin Location */}
      <TextField
        fullWidth
        label="Origin Location"
        name="originLocation"
        value={festivalData.originLocation}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Upload Festival Image */}
      <Button variant="contained" component="label" fullWidth sx={{ margin: "1rem 0" }}>
        Upload Festival Images
        <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
      </Button>

      {/* Preview Uploaded Images */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        {festivalData.Festival_image.map((image, index) => (
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

export default FestivalAdd;
