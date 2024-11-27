import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer open/close state
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",  // Restored transparent background
          color: "#000", // Black text
          boxShadow: "none", // Remove shadow to match original style
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none",
              color: "inherit",
            }}
            component={Link}
            to="/"
          >
            Indian Heritage
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              padding: "4px 10px",
              borderRadius: "8px",
            }}
          >
            <SearchIcon sx={{ color: "#666" }} />
            <input
              type="text"
              placeholder="Search State"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                marginLeft: "8px",
                fontSize: "14px",
              }}
            />
          </Box>

          {/* LogIn & Signup */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: "#000",
                borderColor: "#000",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              LogIn
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Signup
            </Button>
          </Box>

          {/* Menu Button (Only on mobile screens) */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              display: { xs: "block", md: "none" }, // Menu button visible only on small screens
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={toggleDrawer}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
