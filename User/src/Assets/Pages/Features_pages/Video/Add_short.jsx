import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Card, CardMedia, Stack, CircularProgress } from "@mui/material";
import { Fetchuser } from "../../../../Approute";
import axios from "axios";

const AddShort = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const user = Fetchuser();
    const userId = user.userId;
    const [shortData, setShortData] = useState({
        createrId: "",
        createrName: "",
        shortTitle: "",
        shortDescription: "",
        shortImage: null,
        shortImagePreview: null,
        shortVideo: null,
        shortVideoPreview: null,
    });

    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {
        const fetchCreatorDetails = async () => {
            try {
                const response = await axios.post(`${Backend_url}/one_user_detail_by_id`, { userId });
                const data = response.data;
                setShortData((prev) => ({
                    ...prev,
                    createrId: data.userdetail.userId,
                    createrName: data.userdetail.username,
                }));
            } catch (error) {
                console.error("Error fetching creator details:", error);
            }
        };
        fetchCreatorDetails();
    }, [Backend_url, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShortData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShortData((prev) => ({
                    ...prev,
                    shortImage: reader.result, // Store the base64 string
                    shortImagePreview: URL.createObjectURL(file), // Preview image
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const video = document.createElement("video");
            video.preload = "metadata";

            video.onloadedmetadata = () => {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;
                const aspectRatio = videoWidth / videoHeight;

                if (Math.abs(aspectRatio - 9 / 16) > 0.01) {
                    alert("The video must have a 9:16 aspect ratio. Please upload a properly formatted video.");
                    setShortData((prev) => ({ ...prev, shortVideo: null, shortVideoPreview: null }));
                } else {
                    setShortData((prev) => ({
                        ...prev,
                        shortVideo: file,
                        shortVideoPreview: URL.createObjectURL(file),
                    }));
                }
            };

            video.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        const formData = new FormData();
        formData.append("createrId", shortData.createrId);
        formData.append("creater_name", shortData.createrName);
        formData.append("short_title", shortData.shortTitle);
        formData.append("short_description", shortData.shortDescription);
        if (shortData.shortImage) formData.append("short_image", shortData.shortImage);
        if (shortData.shortVideo) formData.append("video", shortData.shortVideo);

        try {
            const response = await axios.post(`${Backend_url}/uploadShort`, formData);
    
            // Assuming the response has a success status
            if (response.status === 200) {
                setLoading(false); // Reset loading state
                alert("Short uploaded successfully!");
            }
        } catch (error) {
            console.error("Error uploading short:", error);
            alert("Failed to upload short.");
            setLoading(false); // Reset loading state in case of error
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: "auto", backgroundColor: "#f7f7f7", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
                Add New Short
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {/* Creator ID */}
                    <TextField
                        label="Creator ID"
                        value={shortData.createrId}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />

                    {/* Creator Name */}
                    <TextField
                        label="Creator Name"
                        value={shortData.createrName}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />

                    {/* Short Title */}
                    <TextField
                        label="Short Title"
                        name="shortTitle"
                        value={shortData.shortTitle}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    {/* Short Description */}
                    <TextField
                        label="Short Description"
                        name="shortDescription"
                        value={shortData.shortDescription}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        required
                    />
                </Stack>

                {/* Video Upload */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        Upload Short Video (9:16 aspect ratio)
                    </Typography>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ width: "100%" }} />
                    {shortData.shortVideoPreview && (
                        <Card sx={{ mt: 2 }}>
                            <CardMedia
                                component="video"
                                src={shortData.shortVideoPreview}
                                controls
                                sx={{ width: "100%", height: "auto", maxHeight: "400px" }}
                            />
                        </Card>
                    )}
                </Box>

                {/* Image Upload */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        Upload Short Image
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%" }} />
                    {shortData.shortImagePreview && (
                        <Card sx={{ mt: 2, maxWidth: "100%", display: "flex", justifyContent: "center" }}>
                            <CardMedia
                                component="img"
                                src={shortData.shortImagePreview}
                                alt="Preview"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: 1,
                                    maxHeight: "250px",
                                    objectFit: "contain",
                                }}
                            />
                        </Card>
                    )}
                </Box>

                {/* Submit Button or Loading Spinner */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={loading} // Disable the button while loading
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: "white", marginRight: 2 }} />
                    ) : (
                        "Add Short"
                    )}
                </Button>
            </form>
        </Box>
    );
};

export default AddShort;
