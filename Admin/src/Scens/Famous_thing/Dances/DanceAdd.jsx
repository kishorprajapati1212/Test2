import { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import axios from "axios";

const DanceAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [danceData, setDanceData] = useState({
    stateId: "",
    state_name: "",
    dance_name: "",
    dance_description: "",
    dance_image: "", // Single image
    cloths: [], // Array of cloth objects
    origin_story: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleStateChange = (state) => {
    setDanceData((prev) => ({
      ...prev,
      stateId: state.stateId,
      state_name: state.state_name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDanceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDanceData((prev) => ({
        ...prev,
        dance_image: reader.result, // Save Base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleClothAdd = () => {
    setDanceData((prev) => ({
      ...prev,
      cloths: [...prev.cloths, { cloth_image: "", cloth_name: "", cloth_description: "" }],
    }));
  };

  const handleClothChange = (index, field, value) => {
    setDanceData((prev) => {
      const updatedCloths = [...prev.cloths];
      updatedCloths[index][field] = value;
      return { ...prev, cloths: updatedCloths };
    });
  };

  const handleClothImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDanceData((prev) => {
        const updatedCloths = [...prev.cloths];
        updatedCloths[index].cloth_image = reader.result; // Replace previous image
        return { ...prev, cloths: updatedCloths };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true
    try {
      console.log("Dance Data Submitted:", danceData);
      const res = await axios.post(`${Backend_url}/Add_Dance`, danceData);
      console.log(res);
      if (res.status === 200) {
        setDanceData({
          stateId: "",
          state_name: "",
          dance_name: "",
          dance_description: "",
          dance_image: "",
          cloths: [],
          origin_story: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Dance
      </Typography>

      {/* State Dropdown */}
      <StateDropdown selectedState={danceData} onStateChange={handleStateChange} />

      {/* Dance Name */}
      <TextField
        fullWidth
        label="Dance Name"
        name="dance_name"
        value={danceData.dance_name}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Dance Description */}
      <TextField
        fullWidth
        label="Dance Description"
        name="dance_description"
        value={danceData.dance_description}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Upload Dance Image */}
      <Button variant="contained" component="label" fullWidth sx={{ margin: "1rem 0" }}>
        Upload Dance Image
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      </Button>
      {danceData.dance_image && (
        <img
          src={danceData.dance_image}
          alt="Dance"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      )}

      {/* Cloths Section */}
      <Typography variant="h6" gutterBottom>
        Cloths
      </Typography>
      {danceData.cloths.map((cloth, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
          <TextField
            fullWidth
            label="Cloth Name"
            value={cloth.cloth_name}
            onChange={(e) => handleClothChange(index, "cloth_name", e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cloth Description"
            value={cloth.cloth_description}
            onChange={(e) => handleClothChange(index, "cloth_description", e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
          <Button variant="contained" component="label">
            Upload Cloth Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleClothImageUpload(index, e.target.files[0])}
            />
          </Button>
          {cloth.cloth_image && (
            <img
              src={cloth.cloth_image}
              alt={`cloth-${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
            />
          )}
        </Box>
      ))}
      <Button variant="outlined" onClick={handleClothAdd}>
        Add Another Cloth
      </Button>

      {/* Origin Story */}
      <TextField
        fullWidth
        label="Origin Story"
        name="origin_story"
        value={danceData.origin_story}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading} // Disable button when loading
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default DanceAdd;
