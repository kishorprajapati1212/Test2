import React, { useState } from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl,CircularProgress  } from "@mui/material";
import axios from "axios";

const AddState = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false); // Loading state

    const [formData, setFormData] = useState({
        state_name: "",
        state_description: "",
        state_images: [],
        state_nickname: "",
        state_direction: "",  // Add direction to the form state
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload and convert to Base64
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const images = [];

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                images.push(reader.result);
                if (images.length === files.length) {
                    setFormData({ ...formData, state_images: images });
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        console.log("Submitted State:", formData);

        try {
            // Send `formData` to your API (replace with real API call)
            const res = await axios.post(`${Backend_url}/Add_state`, formData);

            if (res.status === 200) {
                // If the request is successful, clear the form data
                setFormData({
                    state_name: "",
                    state_description: "",
                    state_images: [],
                    state_nickname: "",
                    state_direction: "",  // Reset direction after form submission
                });
                console.log("State added successfully!");
            } else {
                // If the status is not 200, handle the error (can customize based on API response)
                console.error("Error adding state:", res.data);
                alert("Failed to add state. Please try again.");
            }
        } catch (error) {
            // If there's any error (e.g., network issue or server error)
            console.error("Error:", error);
            alert("An error occurred while adding the state. Please try again.");
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "600px",
                margin: "20px auto",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Add State
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="State Name"
                    name="state_name"
                    value={formData.state_name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="State Description"
                    name="state_description"
                    value={formData.state_description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    fullWidth
                    label="State Nickname"
                    name="state_nickname"
                    value={formData.state_nickname}
                    onChange={handleChange}
                    margin="normal"
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Direction</InputLabel>
                    <Select
                        name="state_direction"
                        value={formData.state_direction}
                        onChange={handleChange}
                        label="Direction"
                    >
                        <MenuItem value="North India">North India</MenuItem>
                        <MenuItem value="South India">South India</MenuItem>
                        <MenuItem value="East India">East India</MenuItem>
                        <MenuItem value="West India">West India</MenuItem>
                        <MenuItem value="Central India">Central India</MenuItem>
                    </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom>
                    Upload State Images
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ marginBottom: "20px" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: "20px" }}
                    disabled={loading} // Disable button when loading
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? "Submitting..." : "Submit"}

                </Button>
            </form>
        </Box>
    );
};

export default AddState;
