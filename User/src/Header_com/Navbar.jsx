import React, { useState } from "react";
import "./Navbar.css";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log(Backend_url);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="inter-font">
      <nav>
        <a href="#" id="iH">
          Indian Heritage
        </a>
        <input type="search" name="searchbar" placeholder="Search State" style={{align:"right"}}/>
        <div className="side_">
          <div className="log_sign">
            <a href="#">LogIn</a> 
            <a href="#">Signup</a>
          </div>

          {/* Transparent AppBar and Menu Icon */}
          <AppBar
            position="static"
            sx={{
              backgroundColor: "transparent", // Remove default blue background
              boxShadow: "none", // Remove any shadow
            }}
          >
            <Toolbar>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "black", // Icon color
                  fontSize: 50, // Adjust size
                
                }}
              >
                <MenuIcon sx={{
                 // Icon color
                  size: 50, // Adjust size
                
                }}/>
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List>
              <ListItem button>Home</ListItem>
              <ListItem button>About</ListItem>
              <ListItem button>Contact</ListItem>
            </List>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
