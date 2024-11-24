import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Container, Input } from "@mui/material";
import axios from "axios";
import StateDropdown from "../../component/StateDropdown";

const OriginUpdate = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const { originhistoryId } = useParams();
    const [origin, setOrigin] = useState({
        state_name: "",
        origin_description: "",
        origin_time: "",
        today_Status: "",
        origin_state_name: "",
    });
    const [existingImages, setExistingImages] = useState([]); // Hold current images from backend
    const [newImages, setNewImages] = useState([]); // Hold newly uploaded images
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrigin = async () => {
            try {
                const response = await axios.get(`${Backend_url}/Get_origin_by_id/${originhistoryId}`);
                setOrigin(response.data);
                setExistingImages(response.data.origin_image || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching origin data:", error);
            }
        };
        fetchOrigin();
    }, [originhistoryId]);

    const handleStateChange = (selectedState) => {
        setOrigin((prevState) => ({
            ...prevState,
            state_name: selectedState.state_name,
            // origin_state_name: selectedState.state_name,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOrigin = {
            ...origin,
            origin_image: [...existingImages, ...newImages], // Combine existing and new images
        };

        try {
            await axios.post(`${Backend_url}/Update_origin/${originhistoryId}`, updatedOrigin);
            // alert("Origin updated successfully!");
            navigate("/origin_home");
        } catch (error) {
            console.error("Error updating origin:", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Update Origin
                </Typography>
                <form onSubmit={handleSubmit}>
                    <StateDropdown
                        onStateChange={handleStateChange}
                        selectedState={{
                            state_name: origin.state_name,
                            stateId: origin.stateId,
                        }}
                    />

                    <TextField
                        label="Origin Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={origin.origin_description}
                        onChange={(e) => setOrigin({ ...origin, origin_description: e.target.value })}
                        style={{ marginBottom: "20px", marginTop:"10px" }}
                    />
                    <TextField
                        label="Origin Time"
                        variant="outlined"
                        fullWidth
                        value={origin.origin_time}
                        onChange={(e) => setOrigin({ ...origin, origin_time: e.target.value })}
                        style={{ marginBottom: "20px" }}
                    />
                    <TextField
                        label="Today Status"
                        variant="outlined"
                        fullWidth
                        value={origin.today_Status}
                        onChange={(e) => setOrigin({ ...origin, today_Status: e.target.value })}
                        style={{ marginBottom: "20px" }}
                    />
                    <TextField
                        label="Origin State Name"
                        variant="outlined"
                        fullWidth
                        value={origin.origin_state_name}
                        onChange={(e) => setOrigin({ ...origin, origin_state_name: e.target.value })}
                        style={{ marginBottom: "20px" }}
                    />

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
                                        style={{ position: "absolute", top: 0, right: 0, color:"black" }}
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

                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Update Origin
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default OriginUpdate;
