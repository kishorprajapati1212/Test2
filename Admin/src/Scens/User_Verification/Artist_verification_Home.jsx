import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
    Typography,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Artist_verification = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    const [artists, setArtists] = useState([]);

    const fetchArtist = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_artist`);
            const data = res.data;
            // Extract the array from the 'artist' property
            if (data.artist && Array.isArray(data.artist)) {
                setArtists(data.artist);
            } else {
                setArtists([]); // Fallback if 'artist' is not an array
            }
        } catch (error) {
            console.error("Error fetching artist data:", error);
            setArtists([]); // Fallback to empty array
        }
    };

    useEffect(() => {
        fetchArtist();
    }, []);

    // Sort artists by verification status (false first, true last)
    const sortedArtists = [...artists].sort((a, b) => a.artistData.verified - b.artistData.verified);

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "bold", color: "#333", marginBottom: "20px" }}
            >
                Artist Verification
            </Typography>
            <TableContainer
                component={Paper}
                sx={{
                    margin: "0 auto",
                    width: "95%",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Profile Image</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedArtists.length > 0 ? (
                            sortedArtists.map((artist) => (
                                <TableRow
                                    key={artist._id}
                                    sx={{
                                        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                                        "&:hover": { backgroundColor: "#f1f1f1" },
                                    }}
                                >
                                    <TableCell>
                                        <Avatar
                                            src={artist.artistData.profile_image}
                                            alt={artist.username}
                                            sx={{
                                                width: "50px",
                                                height: "50px",
                                                border: "1px solid #ddd",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "500" }}>{artist.username}</TableCell>
                                    <TableCell>{artist.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "green",
                                                color: "#fff",
                                                "&:hover": {
                                                    backgroundColor: "darkgreen",
                                                },
                                            }}
                                            component={Link}
                                            to={`/update_artist/${artist.userId}`}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No artists found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Artist_verification;
