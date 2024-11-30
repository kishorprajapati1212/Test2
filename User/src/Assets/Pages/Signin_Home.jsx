import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BrushIcon from "@mui/icons-material/Brush";

const Signin_Home = () => {
  const userTypes = [
    {
      key: "user",
      title: "Regular User",
      description: "Access our platform as a user and explore services.",
      color: "#20c997",
      hoverColor: "#d1f7ec",
      icon: <PersonIcon fontSize="large" />,
      link: "/user_registration", // Link for regular users
    },
    {
      key: "artist",
      title: "Artist",
      description: "Sign up as an artist and showcase your creations.",
      color: "#0d6efd",
      hoverColor: "#d6e4ff",
      icon: <BrushIcon fontSize="large" />,
      link: "/artist_registration", // Link for artists
    },
  ];

  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#343a40",
          textAlign: "center",
        }}
      >
        Get Started with Your Journey
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#6c757d",
          textAlign: "center",
          maxWidth: "600px",
          marginBottom: "24px",
        }}
      >
        Are you a <strong>regular user</strong> looking to explore our services,
        or an <strong>artist</strong> ready to showcase your talent? Choose your
        path below to continue!
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {userTypes.map((type) => (
          <Card
            key={type.key}
            onClick={() => setUserType(type.key)}
            sx={{
              width: "250px",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "16px",
              transition: "all 0.3s ease-in-out",
              border: "2px solid transparent",
              boxShadow:
                userType === type.key
                  ? "0 8px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 10px rgba(0, 0, 0, 0.1)",
              background: userType === type.key ? type.color : "#fff",
              color: userType === type.key ? "#fff" : "#343a40",
              "&:hover": {
                background: type.hoverColor,
                border: `2px solid ${type.color}`,
              },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: userType === type.key ? "#fff" : type.color,
                  color: userType === type.key ? type.color : "#fff",
                  margin: "0 auto",
                  marginBottom: "12px",
                  width: "60px",
                  height: "60px",
                }}
              >
                {type.icon}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {type.title}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                {type.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {userType && (
          <Button
            variant="contained"
            fullWidth
            color={userType === "artist" ? "primary" : "success"}
            onClick={() =>
              navigate(userTypes.find((type) => type.key === userType)?.link)
            }
          >
            Continue as{" "}
            {userTypes.find((type) => type.key === userType)?.title}
          </Button>
        )}

        {!userType && (
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "#343a40",
              fontSize: "18px",
              fontWeight: "bold",
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          >
            Select a user type to continue.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Signin_Home;
