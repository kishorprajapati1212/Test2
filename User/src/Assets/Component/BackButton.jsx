import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            color="default" // Default button color for simplicity
            variant="text"  // Minimal variant without the extra padding
            sx={{
                margin:"2px 2px ",
                fontWeight: "normal",
                textTransform: "none", // Normal text case
                padding: "8px 16px",
                backgroundColor: "black", // Black background
                color: "#fff", // White text for contrast
                borderRadius: "4px", // Slightly rounded corners
                boxShadow: "none", // Remove box shadow for a clean look
                "&:hover": {
                    backgroundColor: "#333", // Darker black on hover
                    boxShadow: "none", // Keep it clean
                },
            }}
        >
            Back
        </Button>
    );
};

export default BackButton;
