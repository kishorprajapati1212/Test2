import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArtistSignin = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const Navigation = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        artistData: {
            homeAddress: "",
            city: "",
            state: "",
            contact: "",
            profile_image: "",
            socialMediaHandles: [{ platform: "Facebook", link: "" }],
        },
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");
        if (keys.length > 1) {
            setFormData((prev) => ({
                ...prev,
                artistData: {
                    ...prev.artistData,
                    [keys[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedHandles = [...formData.artistData.socialMediaHandles];
        updatedHandles[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            artistData: { ...prev.artistData, socialMediaHandles: updatedHandles },
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    artistData: { ...prev.artistData, profile_image: reader.result },
                }));
                setPreviewImage(reader.result); // Set image preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullAddress = `${formData.artistData.homeAddress}, ${formData.artistData.city}, ${formData.artistData.state}`;
        const dataToSend = {
            ...formData,
            artistData: {
                ...formData.artistData,
                address: fullAddress,
            },
        };

        try {
            // console.log(dataToSend)
            const res = await axios.post(`${Backend_url}/artist_signin`, dataToSend);
            console.log("Artist Registration Data:", res.data);

            if (res.status === 200) {
                // localStorage.setItem("Cultrual", JSON.stringify(res.data));
                Navigation("/login")
            }
        } catch (error) {
            console.error("Error registering artist:", error.response?.data?.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
                padding: 4,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    borderRadius: 4,
                    boxShadow: 3,
                    p: 3,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ textAlign: "center", color: "#343a40" }}
                    >
                        Artist Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Home Address"
                                    name="artistData.homeAddress"
                                    value={formData.artistData.homeAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="artistData.city"
                                    value={formData.artistData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="artistData.state"
                                    value={formData.artistData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    name="artistData.contact"
                                    type="number"
                                    value={formData.artistData.contact}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Upload Profile Image
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ marginBottom: "16px" }}
                                />
                                {previewImage && (
                                    <CardMedia
                                        component="img"
                                        src={previewImage}
                                        alt="Profile Preview"
                                        sx={{
                                            borderRadius: 2,
                                            width: "100%",
                                            maxHeight: 200,
                                            objectFit: "cover",
                                            mt: 1,
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Social Media Platform"
                                    value={formData.artistData.socialMediaHandles[0]?.platform || ""}
                                    onChange={(e) =>
                                        handleSocialMediaChange(0, "platform", e.target.value)
                                    }
                                >
                                    <MenuItem value="Facebook">Facebook</MenuItem>
                                    <MenuItem value="Instagram">Instagram</MenuItem>
                                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Social Media Link"
                                    value={formData.artistData.socialMediaHandles[0]?.link || ""}
                                    onChange={(e) =>
                                        handleSocialMediaChange(0, "link", e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    sx={{
                                        py: 1.5,
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ArtistSignin;
