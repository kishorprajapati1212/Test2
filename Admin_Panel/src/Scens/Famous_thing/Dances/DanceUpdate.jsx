import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    FormControl,
    TextField,
    Typography,
    Box,
    Input,
    Chip,
    Container,
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";

const Backend_url = import.meta.env.VITE_BACKEND_URL;

const DanceUpdate = () => {
    const { DanceId } = useParams();
    const [danceData, setDanceData] = useState({
        dance_name: "",
        stateId: "",
        state_name: "",
        cloths: [],
        dance_startDate: "",
        dance_endDate: "",
        history: "",
        significance: "",
        originLocation: "",
        dance_image: "", // Main image for the dance (array for multiple images)
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleStateChange = (danceData) => {
        setDanceData((prevData) => ({
            ...prevData,
            state_name: danceData.state_name,
            stateId: danceData.stateId,
        }));
    };

    // Fetch existing dance data by DanceId
    useEffect(() => {
        const fetchDanceData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/Get_dance_by_id/${DanceId}`);
                setDanceData(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dance data", error);
            }
        };

        fetchDanceData();
    }, [DanceId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDanceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle cloth array (Add new cloth)
    const handleClothChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCloths = [...danceData.cloths];
        updatedCloths[index][name] = value;
        setDanceData((prevData) => ({
            ...prevData,
            cloths: updatedCloths,
        }));
    };

    // Add new cloth
    const addNewCloth = () => {
        setDanceData((prevData) => ({
            ...prevData,
            cloths: [
                ...prevData.cloths,
                { cloth_name: "", cloth_description: "", cloth_image: [] }, // cloth_image as array
            ],
        }));
    };

    // Remove a cloth from the array
    const removeCloth = (index) => {
        const updatedCloths = [...danceData.cloths];
        updatedCloths.splice(index, 1);
        setDanceData((prevData) => ({
            ...prevData,
            cloths: updatedCloths,
        }));
    };

    // Handle image upload (for dance or cloth images)
    const handleImageUpload = (e, index, type) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageBase64 = reader.result;
            if (type === "dance") {
                setDanceData((prevData) => ({
                    ...prevData,
                    dance_image: [imageBase64], // Always keep it as an array
                }));
            } else if (type === "cloth" && index !== null) {
                const updatedCloths = [...danceData.cloths];
                updatedCloths[index].cloth_image = [imageBase64]; // Store as an array
                setDanceData((prevData) => ({
                    ...prevData,
                    cloths: updatedCloths,
                }));
            }
        };
        if (file) reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(danceData); // Check the data before submitting
        try {
            const res = await axios.post(
                `${Backend_url}/Update_dance/${DanceId}`,
                danceData
            );
            navigate("/dance_home");
        } catch (error) {
            console.error("Error updating dance data", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Update Dance Details</Typography>
                <form onSubmit={handleSubmit}>
                    {/* Dance Name */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Dance Name"
                            name="dance_name"
                            value={danceData.dance_name}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>

                    {/* State Dropdown */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <StateDropdown
                            selectedState={danceData}
                            onStateChange={handleStateChange}
                        />
                    </FormControl>

                    {/* Dance Image Upload */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <Input
                            type="file"
                            onChange={(e) => handleImageUpload(e, null, "dance")}
                        />
                        {Array.isArray(danceData.dance_image) && danceData.dance_image.length > 0 && (
                            <img
                                src={danceData.dance_image[0]} // Display the first image in the array
                                alt="Dance Image"
                                width="100"
                                style={{ marginTop: 8 }}
                            />
                        )}
                    </FormControl>

                    {/* Cloths (Dynamic) */}
                    <Box sx={{ marginBottom: 2 }}>
                        {danceData.cloths.map((cloth, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                                    <TextField
                                        label="Cloth Name"
                                        name="cloth_name"
                                        value={cloth.cloth_name}
                                        onChange={(e) => handleClothChange(e, index)}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                                    <TextField
                                        label="Cloth Description"
                                        name="cloth_description"
                                        value={cloth.cloth_description}
                                        onChange={(e) => handleClothChange(e, index)}
                                    />
                                </FormControl>

                                {/* Cloth Image Upload */}
                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <Input
                                        type="file"
                                        onChange={(e) => handleImageUpload(e, index, "cloth")}
                                    />
                                    {Array.isArray(cloth.cloth_image) && cloth.cloth_image.length > 0 && (
                                        <Box sx={{ marginTop: 1 }}>
                                            {cloth.cloth_image.map((image, idx) => (
                                                <img
                                                    key={idx}
                                                    src={image}
                                                    alt="Cloth Image"
                                                    width="100"
                                                    style={{ marginRight: 8, marginBottom: 8 }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </FormControl>

                                <Button
                                    onClick={() => removeCloth(index)}
                                    color="error"
                                    sx={{ marginBottom: 2 }}
                                >
                                    Remove Cloth
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={addNewCloth} sx={{ marginBottom: 2 }}>
                            Add New Cloth
                        </Button>
                    </Box>

                    <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                        Update Dance
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default DanceUpdate;
