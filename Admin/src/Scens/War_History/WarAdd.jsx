import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import StateDropdown from "../../component/StateDropdown";
import axios from "axios";

const WarAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    start_war: "",
    end_war: "",
    war_name: "",
    war_place: "",
    war_between: "",
    war_winner: "",
    war_losses: "",
    war_reason: "",
    war_description: "",
    war_image: "", // Single image in Base64 format
    stateId: "",
    state_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleStateChange = (selectedState) => {
    setFormData((prevData) => ({
      ...prevData,
      stateId: selectedState?.stateId || "",
      state_name: selectedState?.state_name || "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          war_image: reader.result, // Base64-encoded string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Form Data:", formData);

      //   Uncomment this when the backend endpoint is ready
      const response = await axios.post(`${Backend_url}/addWarHistory`, formData);
      console.log("Response:", response.data);

      setSuccess(true);
      setFormData({
        start_war: "",
        end_war: "",
        war_name: "",
        war_place: "",
        war_between: "",
        war_winner: "",
        war_losses: "",
        war_reason: "",
        war_description: "",
        war_image: "",
        stateId: "",
        state_name: "",
      });
    } catch (err) {
      console.error("Error adding war history:", err);
      setError("Failed to add war history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Heritage Place Management
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Start Year"
          name="start_war"
          type="number"
          value={formData.start_war}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="End Year"
          name="end_war"
          type="number"
          value={formData.end_war}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="War Name"
          name="war_name"
          value={formData.war_name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="War Place"
          name="war_place"
          value={formData.war_place}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="War Between"
          name="war_between"
          value={formData.war_between}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="War Winner"
          name="war_winner"
          value={formData.war_winner}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="War Losses"
          name="war_losses"
          value={formData.war_losses}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reason for War"
          name="war_reason"
          value={formData.war_reason}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="War Description"
          name="war_description"
          value={formData.war_description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Typography variant="h6" gutterBottom mt={2}>
          Upload War Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ margin: "10px 0" }}
        />
        {formData.war_image && (
          <Typography color="green" variant="body2">
            Image uploaded successfully.
          </Typography>
        )}
        <StateDropdown onStateChange={handleStateChange} selectedState={formData} />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Submitting..." : "Add War History"}
          </Button>
        </Box>
        {success && (
          <Typography mt={2} color="green">
            War history added successfully!
          </Typography>
        )}
        {error && (
          <Typography mt={2} color="red">
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default WarAdd;
