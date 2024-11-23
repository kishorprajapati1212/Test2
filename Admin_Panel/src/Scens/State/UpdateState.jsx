import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const UpdateState = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams(); // Get the state ID from the URL
    const navigate = useNavigate();
    const [state, setState] = useState({
        state_name: '', 
        state_description: '',
        state_nickname: '',
        state_images: [], // Will contain base64 images
        state_direction: '', // Add the state_direction to your form state
    });
    const [newImages, setNewImages] = useState([]); // For newly uploaded images
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Directions (you can modify this if you need to fetch directions from the backend)
    const directions = [
        'North India',
        'South India',
        'East India',
        'West India',
        'Central India',
    ];

    const fetchState = async () => {
        try {
            const res = await axios.get(`${Backend_url}/One_state_with_all_image/${id}`);
            setState(res.data[0]); // Assuming the response is an array and we need the first item
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch state data');
            setLoading(false);
        }
    };

    // Fetch the current state data by ID
    useEffect(() => {
        fetchState();
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle image upload (either new images or replacement)
    const handleImageChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
    
        // Convert each file to base64
        const base64Images = fileArray.map((file) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // This will return base64 string
                reader.readAsDataURL(file); // Convert to base64
            })
        );
    
        // Once all files are converted to base64, update the state
        Promise.all(base64Images).then((base64ImageUrls) => {
            // Assuming you have a state for holding images
            setNewImages((prevImages) => [...prevImages, ...base64ImageUrls]);
        });
    };
    

    // Handle form submission to update the state
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if there are new images. If not, keep the old images
        const updatedState = {
            ...state,
            state_images: newImages.length > 0 ? newImages : state.state_images, // If there are new images, replace the old ones, otherwise keep the previous ones
        };
    
        try {
            const res = await axios.post(`${Backend_url}/Update_state/${id}`, updatedState);
            navigate('/state_home'); // Redirect to the state home page after successful update
        } catch (error) {
            setError('Failed to update state');
        }
    };
    

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Update State</Typography>

            <TextField
                fullWidth
                label="State Name"
                variant="outlined"
                name="state_name"
                value={state.state_name || ''} // Ensure it's empty or the fetched value
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
            />

            <TextField
                fullWidth
                label="State Description"
                variant="outlined"
                name="state_description"
                value={state.state_description || ''} // Ensure it's empty or the fetched value
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
            />

            <TextField
                fullWidth
                label="State Nickname"
                variant="outlined"
                name="state_nickname"
                value={state.state_nickname || ''} // Ensure it's empty or the fetched value
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
            />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="state-direction-label">State Direction</InputLabel>
                <Select
                    labelId="state-direction-label"
                    label="State Direction"
                    name="state_direction"
                    value={state.state_direction || ''} // Ensure the value is set
                    onChange={handleChange}
                    required
                >
                    {directions.map((direction, index) => (
                        <MenuItem key={index} value={direction}>
                            {direction}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <input
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ marginBottom: '20px' }}
            />

            <div>
                {state.state_images && state.state_images.length > 0 && (
                    <div>
                        <Typography variant="body1">Current Images</Typography>
                        {state.state_images.map((image, index) => (
                            <img key={index} src={image} alt={`State Image ${index}`} style={{ width: 100, marginRight: 10 }} />
                        ))}
                    </div>
                )}
            </div>

            <Button type="submit" variant="contained" color="primary">Update State</Button>
        </Box>
    );
};

export default UpdateState;
