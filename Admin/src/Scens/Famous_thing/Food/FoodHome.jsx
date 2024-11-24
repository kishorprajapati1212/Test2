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

const FoodHome = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const [selectedFood, setSelectedFood] = useState(null);  // Renamed for clarity
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [foods, setFoods] = useState([]);  // Renamed to reflect food data

    const fetchFoods = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_all_food`);
            setFoods(res.data); // Ensure the correct property is used
        } catch (error) {
            console.error("Error fetching foods:", error);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleDelete = async () => {
        if (selectedFood) {
            try {
                const res = await axios.get(`${Backend_url}/Delete_food/${selectedFood.foodId}`);
                if (res.status === 200) {
                    setPopupOpen(false);
                    setFoods((prevFoods) =>
                        prevFoods.filter((food) => food.foodId !== selectedFood.foodId)
                    );
                }
            } catch (error) {
                console.error("Error deleting food:", error);
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", width: "auto" }}>
                <Typography variant="h4" gutterBottom>
                    Food Management
                </Typography>

                {/* Add Food Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "20px" }}
                        component={Link}
                        to="/Add_Food"
                    >
                        + Add Food
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Food Name</strong></TableCell>
                                <TableCell><strong>State Name</strong></TableCell>
                                <TableCell><strong>Famous For</strong></TableCell>
                                <TableCell><strong>Recipes</strong></TableCell>
                                <TableCell><strong>Famous Location</strong></TableCell>
                                <TableCell><strong>Origin Story</strong></TableCell>
                                <TableCell><strong>Image</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((food) => (
                                <TableRow key={food.foodId}>
                                    <TableCell>{food.food_name.slice(0, 10)}...</TableCell>
                                    <TableCell>{food.state_name}</TableCell>
                                    <TableCell>{food.famous_for.slice(0, 10) || "N/A"}</TableCell>
                                    <TableCell>{food.recipes.slice(0, 10) || "N/A"}</TableCell>
                                    <TableCell>{food.famous_location.slice(0, 10) || "N/A"}</TableCell>
                                    <TableCell>{food.origi_story || "N/A"}</TableCell>
                                    <TableCell>
                                        {food.food_image && food.food_image.length > 0 ? (
                                            <img
                                                src={food.food_image[0]} // Assuming `food_image` is an array
                                                alt={food.food_name}
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
                                            to={`/Update_Food/${food.foodId}`}
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
                                                setSelectedFood(food);  // Set selected food for delete
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
                    <Typography>Are you sure you want to delete this food?</Typography>
                </Deletepopup>
            </div>
        </>
    );
};

export default FoodHome;
