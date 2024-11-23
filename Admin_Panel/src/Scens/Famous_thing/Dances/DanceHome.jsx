import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Deletepopup from "../../../Global_Component/Deletepopup";

const DanceHome = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const [selectedDance, setSelectedDance] = useState(null); // For delete confirmation
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [dances, setDances] = useState([]); // State for dance data

    // Fetch all dances
    const fetchDances = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_all_dances`);
            setDances(res.data);
        } catch (error) {
            console.error("Error fetching dances:", error);
        }
    };

    useEffect(() => {
        fetchDances();
    }, []);

    // Handle delete
    const handleDelete = async () => {
        if (selectedDance) {
            try {
                const res = await axios.get(`${Backend_url}/Delete_dance/${selectedDance.DanceId}`);
                if (res.status === 200) {
                    setPopupOpen(false);
                    setDances((prevDances) =>
                        prevDances.filter((dance) => dance.DanceId !== selectedDance.DanceId)
                    );
                }
            } catch (error) {
                console.error("Error deleting dance:", error);
            }
        }
    };

    return (
        <div style={{ padding: "20px", width: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Dance Management
            </Typography>

            {/* Add Dance Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "20px" }}
                    component={Link}
                    to="/Add_dance"
                >
                    + Add Dance
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Dance Name</strong></TableCell>
                            <TableCell><strong>State Name</strong></TableCell>
                            <TableCell><strong>Image</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dances.map((dance) => (
                            <TableRow key={dance.danceId}>
                                <TableCell>{dance.dance_name}</TableCell>
                                <TableCell>{dance.state_name}</TableCell>
                                <TableCell>
                                    {dance.dance_image ? (
                                        <img
                                            src={dance.dance_image}
                                            alt={dance.dance_name}
                                            style={{ width: "50px", borderRadius: "5px" }}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            backgroundColor: "green",
                                            color: "white",
                                            marginRight: "10px",
                                            "&:hover": { backgroundColor: "#006400" },
                                        }}
                                        component={Link}
                                        to={`/Update_dance/${dance.DanceId}`}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        sx={{
                                            backgroundColor: "red",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#8B0000" },
                                        }}
                                        onClick={() => {
                                            setSelectedDance(dance);
                                            setPopupOpen(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Popup */}
            <Deletepopup
                open={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                title="Confirm Delete"
                onConfirm={handleDelete}
            >
                <Typography>Are you sure you want to delete this dance?</Typography>
            </Deletepopup>
        </div>
    );
};

export default DanceHome;
