import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    Box,
    Paper,
    Avatar,
    FormControlLabel,
    Checkbox,
    Button,
    CircularProgress,
    Link,
} from "@mui/material";

const Update_Artist = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { userId } = useParams(); // Extract userId from route params
    const [artist, setArtist] = useState(null); // Artist data
    const [loading, setLoading] = useState(true); // Loading state
    const [verified, setVerified] = useState(false); // Verification status

    // Fetch artist details
    const fetchUser = async () => {
        try {
            const res = await axios.post(`${Backend_url}/one_user_detail_by_id`, { userId });
            const data = res.data?.userdetail;
            if (data) {
                setArtist(data);
                setVerified(data.artistData?.verified || false); // Set verification status
            }
        } catch (error) {
            console.error("Error fetching artist details:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Update artist details
    const updateArtist = async () => {
        try {
            const updatedData = { ...artist, artistData: { ...artist.artistData, verified } };
            await axios.post(`${Backend_url}/update_artist/${userId}`, updatedData); // Assuming you have this endpoint
            navigate("/Artist_verification")
            alert("Artist updated successfully!");
        } catch (error) {
            console.error("Error updating artist:", error);
            alert("Failed to update artist.");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const { username, email, artistData } = artist || {};
    const { address, profile_image, socialMediaHandles } = artistData || {};

    return (
        <Box
            sx={{
                maxWidth: "600px",
                margin: "20px auto",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
            }}
            component={Paper}
        >
            <Typography variant="h4" gutterBottom align="center">
                Update Artist Details
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar
                    src={profile_image}
                    alt={username}
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography variant="h6">{username}</Typography>
                <Typography variant="body1" color="text.secondary">
                    {email}
                </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                <strong>Address:</strong> {address}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                <strong>Social Media:</strong>{" "}
                {socialMediaHandles?.length > 0 ? (
                    socialMediaHandles.map((handle, index) => (
                        <Link
                            key={index}
                            href={handle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textDecoration: "none",
                                color: "blue",
                                marginRight: 1,
                            }}
                        >
                            {handle.platform}
                        </Link>
                    ))
                ) : (
                    "No social media handles provided."
                )}
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                        color="primary"
                    />
                }
                label="Verified"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={updateArtist}
            >
                Update Artist
            </Button>
        </Box>
    );
};

export default Update_Artist;
