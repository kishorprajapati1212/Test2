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

export const placeTypes = ["Heritage", "Fort", "Temple", "Museum"];

const PlaceHome = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const [selectedplace, setselectedplace] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [place, setplace] = useState([]);

    const fetchPlace = async () => {
        const res = await axios.get(`${Backend_url}/Get_all_place`);
        setplace(res.data); // Ensure the correct property (e.g., res.data) is used
    }

    useEffect(() => {
        fetchPlace();
    }, []);

    console.log(place);

    const handleDelete = async () => {
        if (selectedplace) {
            try {
                const res = await axios.get(`${Backend_url}/Delete_place/${selectedplace.HeritageId}`);
                if (res.status === 200) {
                    setPopupOpen(false);
                    // Update `place` state by removing the deleted place
                    setplace((prevPlaces) =>
                        prevPlaces.filter((place) => place.HeritageId !== selectedplace.HeritageId)
                    );
                    setselectedplace(null); // Clear the selected place
                }
            } catch (error) {
                console.error("Error deleting place:", error);
            }
        }
    };
    

    return (
        <>
            <div style={{ padding: "20px", width: "auto" }}>
                <Typography variant="h4" gutterBottom>
                    Place Management
                </Typography>

                {/* Add State Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "20px" }}
                        component={Link}
                        to="/Add_Place"
                    >
                        + Add Place
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Place Name</strong></TableCell>
                                <TableCell><strong>State Name</strong></TableCell>
                                <TableCell><strong>Place Builder</strong></TableCell>
                                <TableCell><strong>Period</strong></TableCell>
                                <TableCell><strong>Place Type</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Image</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {place.map((place) => (
                                <TableRow key={place.stateId}>
                                    <TableCell>{place.place_name.slice(0,10)}....</TableCell>
                                    <TableCell>{place.state_name}</TableCell>
                                    <TableCell>{place.builder || "N/A"}</TableCell>
                                    <TableCell>{place.Period || "N/A"}</TableCell>
                                    <TableCell>{place.place_type}</TableCell>
                                    <TableCell>
                                        <a href={place.google_map_url} target="_blank" rel="noopener noreferrer">
                                            {place.google_map_url.slice(0, 16)}...
                                        </a>
                                    </TableCell>

                                    <TableCell>
                                        {place.place_image && place.place_image.length > 0 ? (
                                            <img
                                                src={place.place_image[0]} // Assuming `place.place_image` is an array
                                                alt={place.place_name}
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
                                            component={Link}
                                            sx={{
                                                backgroundColor: "green",
                                                color: "white",
                                                marginRight: "10px",
                                                "&:hover": { backgroundColor: "#006400" },
                                            }}
                                            to={`/Update_place/${place.HeritageId}`} // Make sure `HeritageId` is valid
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
                                                setselectedplace(place); // Set the selected place, not state
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
                    <Typography>Are you sure you want to delete this place?</Typography>
                </Deletepopup>
            </div>
        </>
    )
}

export default PlaceHome;
