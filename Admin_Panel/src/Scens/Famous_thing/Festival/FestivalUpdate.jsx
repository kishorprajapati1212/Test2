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
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";

const Backend_url = import.meta.env.VITE_BACKEND_URL;

const FestivalUpdate = () => {
    const { FestivalId } = useParams(); // Retrieve festivalId from the URL
    // console.log(FestivalId)
    const [festivalData, setFestivalData] = useState({
        festival_name: "",
        stateId: "",
        state_name: "",
        festival_startDate: "",
        festival_endDate: "",
        celebrationReason: "",
        celebrationMethods: "",
        festivalSignificance: "",
        originLocation: "",
        Festival_image: [], // Array for images
    });
    const [existingImages, setExistingImages] = useState([]); // Hold current images from backend
    const [newImages, setNewImages] = useState([]); // Hold newly uploaded images
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    // Fetch festival data by festivalId
    useEffect(() => {
        const fetchFestivalData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/Get_festival_by_id/${FestivalId}`);
                // console.log(res.data)
                setFestivalData(res.data); // Populate the form with the fetched data
                setExistingImages(res.data.Festival_image || []); // Set existing images
                setLoading(false);
            } catch (error) {
                console.error("Error fetching festival data", error);
            }
        };

        fetchFestivalData();
    }, [FestivalId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFestivalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStateChange = (selectedState) => {
        setFestivalData((prevData) => ({
            ...prevData,
            state_name: selectedState.state_name,
            stateId: selectedState.stateId,
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

    const handleUpdateFestival = async () => {
        const updatedFestival = {
            ...festivalData,
            Festival_image: [...existingImages, ...newImages], // Combine existing and new images
        };

        try {
            const response = await axios.post(
                `${Backend_url}/Update_festival/${FestivalId}`,
                updatedFestival
            );
            if (response.status === 200) {
                console.log("Festival updated successfully", response);
                navigate("/festival_home"); // Redirect after update
            }
        } catch (error) {
            console.error("Error updating festival", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Update Festival Details
            </Typography>

            <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    label="Festival Name"
                    name="festival_name"
                    value={festivalData.festival_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <StateDropdown
                        selectedState={festivalData}
                        onStateChange={handleStateChange}
                    />
                </FormControl>

                <TextField
                    label="Start Date"
                    name="festival_startDate"
                    type="date"
                    value={festivalData.festival_startDate}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="End Date"
                    name="festival_endDate"
                    type="date"
                    value={festivalData.festival_endDate}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Celebration Reason"
                    name="celebrationReason"
                    value={festivalData.celebrationReason}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Celebration Methods"
                    name="celebrationMethods"
                    value={festivalData.celebrationMethods}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Significance"
                    name="festivalSignificance"
                    value={festivalData.festivalSignificance}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Origin Location"
                    name="originLocation"
                    value={festivalData.originLocation}
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
                    onClick={handleUpdateFestival}
                    sx={{ mt: 2 }}
                >
                    Update Festival
                </Button>
            </Box>
        </>
    );
};

export default FestivalUpdate;
