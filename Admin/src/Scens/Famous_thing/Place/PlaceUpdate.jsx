import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Typography,
    Box,
    Input,
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import { placeTypes } from "./PlaceHome";

const Backend_url = import.meta.env.VITE_BACKEND_URL;

const PlaceUpdate = () => {
    const { HeritageId } = useParams(); // Retrieve HeritageId from the URL
    const [placeData, setPlaceData] = useState({
        place_name: "",
        state_name: "",
        builder: "",
        Period: "",
        place_type: "",
        google_map_url: "",
        place_image: [], // Array for images
        location: "", // Add location field
    });
    const [existingImages, setExistingImages] = useState([]); // Hold current images from backend
    const [newImages, setNewImages] = useState([]); // Hold newly uploaded images
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    // Function to extract latitude and longitude from Google Maps URL
    const extractLatLongFromURL = (url) => {
        const regex = /@([0-9.-]+),([0-9.-]+)/;
        const match = url.match(regex);
        if (match) {
            return {
                latitude: match[1],
                longitude: match[2],
            };
        }
        return { latitude: "", longitude: "" }; // Return empty strings if no match
    };

    // Fetch place data by HeritageId
    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/Get_place_by_id/${HeritageId}`);
                setPlaceData(res.data); // Populate the form with the fetched data
                setExistingImages(res.data.place_image || []); // Set existing images
                setLoading(false);
            } catch (error) {
                console.error("Error fetching place data", error);
            }
        };

        fetchPlaceData();
    }, [HeritageId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlaceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStateChange = (selectedState) => {
        setPlaceData((prevData) => ({
            ...prevData,
            state_name: selectedState.state_name,
            stateId: selectedState.stateId,
        }));
    };

    const handleGoogleMapUrlChange = (e) => {
        const url = e.target.value;
        const { latitude, longitude } = extractLatLongFromURL(url);

        // Update location field with latitude and longitude
        const location = latitude && longitude ? `${latitude}, ${longitude}` : "";

        setPlaceData((prevData) => ({
            ...prevData,
            google_map_url: url,
            location: location, // Save the latitude and longitude in the location field
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const base64Promises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(base64Promises).then((base64Images) => {
            setNewImages((prev) => [...prev, ...base64Images]);
        });
    };

    const removeExistingImage = (index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpdatePlace = async () => {
        const updatedPlace = {
            ...placeData,
            place_image: [...existingImages, ...newImages], // Combine existing and new images
        };

        try {
            const response = await axios.post(
                `${Backend_url}/Update_place/${HeritageId}`,
                updatedPlace
            );
            if(response.status == 200){
                console.log("Place updated successfully", response);
                navigate("/place_home"); // Redirect after update
            }
            
        } catch (error) {
            console.error("Error updating place", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Update Place Details
            </Typography>

            <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    label="Place Name"
                    name="place_name"
                    value={placeData.place_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <StateDropdown
                        selectedState={placeData}
                        onStateChange={handleStateChange}
                    />
                </FormControl>

                <TextField
                    label="Builder"
                    name="builder"
                    value={placeData.builder}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Period"
                    name="Period"
                    value={placeData.Period}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Place Type</InputLabel>
                    <Select
                        name="place_type"
                        value={placeData.place_type}
                        onChange={handleInputChange}
                        label="Place Type"
                    >
                        {placeTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Google Map URL"
                    name="google_map_url"
                    value={placeData.google_map_url}
                    onChange={handleGoogleMapUrlChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Location (Latitude, Longitude)"
                    name="location"
                    value={placeData.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                {/* Image Upload */}
                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: "20px" }}
                />

                {/* Display Existing Images */}
                {existingImages.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                        {existingImages.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={image}
                                    alt={`Existing ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ddd" }}
                                />
                                <Button
                                    onClick={() => removeExistingImage(index)}
                                    style={{ position: "absolute", top: 0, right: 0, color: "black" }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display New Images */}
                {newImages.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                        {newImages.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={image}
                                    alt={`New ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ddd" }}
                                />
                                <Button
                                    onClick={() => removeNewImage(index)}
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePlace}
                    sx={{ mt: 2 }}
                >
                    Update Place
                </Button>
            </Box>
        </>
    );
};

export default PlaceUpdate;
