import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import AlertPopup from "../AlertPopup"; // Import the AlertPopup component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignin = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({ open: false, message: "", severity: "success", });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validate email and password
        if (!formData.email.includes("@gmail.com")) {
            setAlert({ open: true, message: "Please enter a valid Gmail address!", severity: "error", });
            return;
        }

        if (formData.password.length < 8) {
            setAlert({ open: true, message: "Password must be at least 8 characters long!", severity: "error", });
            return;
        }

        try {
            // Send registration data to the backend
            const res = await axios.post(`${Backend_url}/regular_user_sigin`, formData);

            // If the registration is successful
            if(res.status === 200){
                // localStorage.setItem("Cultrual", JSON.stringify(res.data));
                navigate("/login")
                setAlert({ open: true, message: "Registration successful!", severity: "success", });
            }

            console.log("User Registration Data:", res.data.message);
        } catch (error) {

            if (error.response && error.response.data) {
                setAlert({ open: true, message: "An error occurred. Please try again.", severity: "error", });
            } 
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
                padding: "0 16px",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    margin: "auto",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ textAlign: "center", color: "#343a40" }}
                    >
                        User Registration
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            marginBottom: "16px",
                            color: "#6c757d",
                        }}
                    >
                        Create your account to access our services.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {/* AlertPopup Component */}
            {alert.open && (
                <AlertPopup message={alert.message} severity={alert.severity} open={alert.open} setOpen={setAlert} />
            )}
        </Box>
    );
};

export default UserSignin;
