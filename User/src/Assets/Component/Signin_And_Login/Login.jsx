import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the submit button

    const Navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when the form is submitted

        try {
            const response = await axios.post(`${Backend_url}/login_user`, {
                email,
                password,
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                localStorage.setItem("Cultrual", JSON.stringify(response.data.user)); // Save user data in localStorage
                Navigation("/")
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false); // Stop loading after the response
        }
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                marginTop: "100px",
                marginBottom: "100px",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 600 }}>
                Login
            </Typography>

            {/* Display message after login attempt */}
            {message && (
                <Alert severity={message === "User Login Successfully" ? "success" : "error"} style={{ marginBottom: "20px" }}>
                    {message}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        required
                        size="small"
                        style={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: "4px",
                        }}
                    />
                </Box>

                <Box mb={3}>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        required
                        size="small"
                        style={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: "4px",
                        }}
                    />
                </Box>

                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading} // Disable the button while loading
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Login;
