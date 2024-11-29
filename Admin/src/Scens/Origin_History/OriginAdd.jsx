import React, { useState } from "react";
import {
    TextField,
    Button, 
    Typography,
    Box,
    Paper,
    CircularProgress,
} from "@mui/material";
import StateDropdown from "../../component/StateDropdown";
import axios from "axios";

const OriginAdd = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        stateId: "",
        state_name: "",
        origin_state_name: "", // Added field
        origin_description: "",
        origin_image: [],
        origin_time: "",
        today_Status: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle State Change from StateDropdown
    const handleStateChange = (selectedState) => {
        setFormData((prev) => ({
            ...prev,
            stateId: selectedState.stateId,
            state_name: selectedState.state_name,
            origin_state_name: selectedState.state_name, // Populate origin_state_name
        }));
    };

    // Handle input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image upload with a limit of 2 images
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 2) {
            alert("You can only upload up to 2 images.");
            return;
        }

        const base64Images = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result); // Base64-encoded string
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );

        setFormData((prevData) => ({
            ...prevData,
            origin_image: base64Images, // Array of Base64-encoded strings
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData)

        try {
            const res = await axios.post(`${Backend_url}/Add_origin`, formData);

            if (res.status === 200) {
                console.log("Inserted");
                setFormData({
                    stateId: "",
                    state_name: "",
                    origin_state_name: "",
                    origin_description: "",
                    origin_image: [],
                    origin_time: "",
                    today_Status: "",
                });
            }

            console.log("Form Data Submitted:", formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 600,
                mx: "auto",
                mt: 4,
                backgroundColor: "transparent",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Add Origin
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* State Dropdown */}
                <Box mb={3}>
                    <StateDropdown
                        onStateChange={handleStateChange}
                        selectedState={{
                            stateId: formData.stateId,
                            state_name: formData.state_name,
                        }}
                    />
                </Box>

                {/* Origin State Name */}
                <Box mb={3}>
                    <TextField
                        label="Origin State Name"
                        name="origin_state_name"
                        value={formData.origin_state_name}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Box>

                {/* Origin Description */}
                <Box mb={3}>
                    <TextField
                        label="Origin Description"
                        name="origin_description"
                        value={formData.origin_description}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                    />
                </Box>

                {/* Image Upload */}
                <Box mb={3}>
                    <Typography variant="body1" gutterBottom>
                        Upload Images (Max 2):
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ marginBottom: "10px" }}
                    />
                    {formData.origin_image.length > 0 && (
                        <ul>
                            {formData.origin_image.map((file, index) => (
                                <li key={index}>Image {index + 1}</li>
                            ))}
                        </ul>
                    )}
                </Box>

                {/* Origin Time */}
                <Box mb={3}>
                    <TextField
                        label="Origin Time"
                        name="origin_time"
                        value={formData.origin_time}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Box>

                {/* Today Status */}
                <Box mb={3}>
                    <TextField
                        label="Today Status"
                        name="today_Status"
                        value={formData.today_Status}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Box>

                {/* Submit Button */}
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Submit"}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default OriginAdd;
