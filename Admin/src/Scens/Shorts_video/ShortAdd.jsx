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
    short_ad: true, // Set short_ad to true
  });
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(""); // State for Base64 image

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle video file selection
  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle image file selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result); // Set Base64 string for image
    };
    reader.readAsDataURL(file); // Convert to Base64
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !imageFile) {
      alert("Please select both a video and an image file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("createrId", formData.createrId);
    formDataToSend.append("creater_name", formData.creater_name);
    formDataToSend.append("short_title", formData.short_title);
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("short_ad", formData.short_ad); // Send the short_ad field
    formDataToSend.append("video", videoFile); // Send video as file
    formDataToSend.append("short_image", base64Image); // Send image as Base64 string
    console.log("Video", videoFile)
    console.log("short_image", base64Image)
    console.log(formData);

    try {
      const response = await axios.post(`${Backend_url}/uploadShort`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Short added:", response.data);
      alert("Short uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading short:", error);
      alert("Failed to upload short.");
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

        {/* Video Upload */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Upload Video:
        </Typography>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
          style={{ display: "block", marginBottom: "16px" }}
        />

        {/* Image Upload */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Upload Image:
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={{ display: "block", marginBottom: "16px" }}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Upload Short
        </Button>
      </form>
    </Box>
  );
};

export default ShortAdd;
