import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

const ShortAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    createrId: "",
    creater_name: "",
    short_title: "",
    short_description: "",
  });
  const [videoFile, setVideoFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("createrId", formData.createrId);
    formDataToSend.append("creater_name", formData.creater_name);
    formDataToSend.append("short_title", formData.short_title);
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("video", videoFile);

    try {
      const response = await axios.post(`${Backend_url}/uploadShort`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Short added:", response.data);
    //   alert("Short uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading short:", error);
    //   alert("Failed to upload short.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upload Short
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Creator ID"
          name="createrId"
          value={formData.createrId}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Creator Name"
          name="creater_name"
          value={formData.creater_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Short Title"
          name="short_title"
          value={formData.short_title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Short Description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
        />
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Upload Short
        </Button>
      </form>
    </Box>
  );
};

export default ShortAdd;
