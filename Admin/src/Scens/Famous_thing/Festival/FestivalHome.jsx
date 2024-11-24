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

const FestivalHome = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const [selectedFestival, setSelectedFestival] = useState(null); // For delete confirmation
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [festivals, setFestivals] = useState([]); // State for festival data

    // Fetch all festivals
    const fetchFestivals = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_all_festivals`);
            setFestivals(res.data);
        } catch (error) {
            console.error("Error fetching festivals:", error);
        }
    };

    useEffect(() => {
        fetchFestivals();
    }, []);

    // Handle delete
    const handleDelete = async () => {
        if (selectedFestival) {
            try {
                const res = await axios.get(`${Backend_url}/Delete_festival/${selectedFestival.FestivalId}`);
                if (res.status === 200) {
                    setPopupOpen(false);
                    setFestivals((prevFestivals) =>
                        prevFestivals.filter((festival) => festival.FestivalId !== selectedFestival.FestivalId)
                    );
                }
            } catch (error) {
                console.error("Error deleting festival:", error);
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", width: "auto" }}>
                <Typography variant="h4" gutterBottom>
                    Festival Management
                </Typography>

                {/* Add Festival Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "20px" }}
                        component={Link}
                        to="/Add_festival"
                    >
                        + Add Festival
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Festival Name</strong></TableCell>
                                <TableCell><strong>State Name</strong></TableCell>
                                <TableCell><strong>Start Date</strong></TableCell>
                                <TableCell><strong>End Date</strong></TableCell>
                                {/* <TableCell><strong>Reason</strong></TableCell>
                                <TableCell><strong>Methods</strong></TableCell> */}
                                <TableCell><strong>Image</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {festivals.map((festival) => (
                                <TableRow key={festival.FestivalId}>
                                    <TableCell>{festival.festival_name.slice(0,20)}</TableCell>
                                    <TableCell>{festival.state_name}</TableCell>
                                    <TableCell>{new Date(festival.festival_startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(festival.festival_endDate).toLocaleDateString()}</TableCell>
                                    {/* <TableCell>{festival.celebrationReason.slice(0,10) || "N/A"}</TableCell>
                                    <TableCell>{festival.celebrationMethods.slice(0,10) || "N/A"}</TableCell> */}
                                    <TableCell>
                                        {festival.Festival_image && festival.Festival_image.length > 0 ? (
                                            <img
                                                src={festival.Festival_image[0]} // Assuming multiple images, using the first one
                                                alt={festival.festival_name}
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
                                            to={`/Update_festival/${festival.FestivalId}`}
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
                                                setSelectedFestival(festival);
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
                    <Typography>Are you sure you want to delete this festival?</Typography>
                </Deletepopup>
            </div>
        </>
    );
};

export default FestivalHome;
