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

const FoodUpdate = () => {
    const { foodId } = useParams(); // Retrieve foodId from the URL
    const [foodData, setFoodData] = useState({
        food_name: "",
        stateId:"",
        state_name: "",
        famous_for: "",
        recipes: "",
        famous_location: "",
        origi_story: "",
        food_image: [], // Array for images
    });
    const [existingImages, setExistingImages] = useState([]); // Hold current images from backend
    const [newImages, setNewImages] = useState([]); // Hold newly uploaded images
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();
    // console.log(foodData)

    // Fetch food data by foodId
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/Get_food_by_id/${foodId}`);
                setFoodData(res.data); // Populate the form with the fetched data
                setExistingImages(res.data.food_image || []); // Set existing images
                setLoading(false);
            } catch (error) {
                console.error("Error fetching food data", error);
            }
        };

        fetchFoodData();
    }, [foodId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStateChange = (selectedState) => {
        setFoodData((prevData) => ({
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

    const handleUpdateFood = async () => {
        const updatedFood = {
            ...foodData,
            food_image: [...existingImages, ...newImages], // Combine existing and new images
        };

        try {
            const response = await axios.post(
                `${Backend_url}/Update_food/${foodId}`,
                updatedFood
            );
            if(response.status === 200){
                console.log("Food updated successfully", response);
                navigate("/food_home"); // Redirect after update
            }
        } catch (error) {
            console.error("Error updating food", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Update Food Details
            </Typography>

            <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    label="Food Name"
                    name="food_name"
                    value={foodData.food_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <StateDropdown
                        selectedState={foodData}
                        onStateChange={handleStateChange}
                    />
                </FormControl>

                <TextField
                    label="Famous For"
                    name="famous_for"
                    value={foodData.famous_for}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Recipes"
                    name="recipes"
                    value={foodData.recipes}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Famous Location"
                    name="famous_location"
                    value={foodData.famous_location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Origin Story"
                    name="origi_story"
                    value={foodData.origi_story}
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
                    onClick={handleUpdateFood}
                    sx={{ mt: 2 }}
                >
                    Update Food
                </Button>
            </Box>
        </>
    );
};

export default FoodUpdate;
