import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from "@mui/material";
import Theme from "../Theme";

const Item = ({ title, to, selected, setSelected }) => {
    return (
        <MenuItem
            onClick={() => setSelected(title)} // Update the selected item when clicked
            active={selected === title} // Apply active state style if selected
            style={{
                color: selected === title ? Theme.white[100] : Theme.grey[100], // Use Theme for text color
                backgroundColor: selected === title ? Theme.primary[10] : "transparent", // Use Theme for background
                fontSize: "16px", // Adjust font size
                padding: "10px 20px",
                transition: "background-color 0.3s ease", // Smooth transition effect for background color
            }}
        >
            <RouterLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>{title}</Typography>
            </RouterLink>
        </MenuItem>
    );
};
const CategoryHeader = ({ title }) => {
    return (
        <Typography
            variant="body2"  // Use a smaller typography variant
            sx={{
                padding: "5px 10px",  // Reduced padding for a smaller header
                color: "black",
                backgroundColor: Theme.primary[200],
                fontWeight: "bold",
                marginTop: "10px",  // Reduced margin top for closer spacing
                fontSize: "14px", // Smaller font size
            }}
        >
            {title}
        </Typography>
    );
};

const Sidebars = () => {
    const [selected, setSelected] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle the collapsed state
    };

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: Theme.primary[1000] }}>
            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                style={{
                    position: "relative",
                    backgroundColor: Theme.primary[100], // Use Theme for sidebar background
                }}
            >
                {/* Close/Toggle button */}
                <div
                    style={{
                        padding: "10px", // Space around the button
                        display: "flex",
                        justifyContent: "flex-start", // Center when collapsed
                    }}
                >
                    <button
                        onClick={toggleSidebar}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "24px",
                            color: "black", // Use Theme for button color
                            cursor: "pointer",
                        }}
                    >
                        {collapsed ? "=" : "x"}
                    </button>
                </div>

                {/* Menu Items */}
                <Menu
                    style={{ marginTop: "20px" }} // Add space below the toggle button
                >
                    <CategoryHeader title="User" />
                    <Item title="Artist verification" to="/Artist_verification" selected={selected} setSelected={setSelected} />

                    <CategoryHeader title="State" />
                    <Item title="State" to="/state_home" selected={selected} setSelected={setSelected} />

                    <CategoryHeader title="History" />
                    <Item title="War History" to="/War_home" selected={selected} setSelected={setSelected} />
                    <Item title="Origin History" to="/origin_home" selected={selected} setSelected={setSelected} />
                    
                    <CategoryHeader title="Video" />
                    <Item title="Shorts" to="/Short_home" selected={selected} setSelected={setSelected} />
                    <Item title="Livestream" to="/Livestream" selected={selected} setSelected={setSelected} />

                    <CategoryHeader title="Famous Things" />
                    <Item title="Place" to="/Place_home" selected={selected} setSelected={setSelected} />
                    <Item title="Food" to="/food_home" selected={selected} setSelected={setSelected} />
                    <Item title="Festival" to="/festival_home" selected={selected} setSelected={setSelected} />
                    <Item title="Dance" to="/dance_home" selected={selected} setSelected={setSelected} />
                    <Item title="Product" to="/product_home" selected={selected} setSelected={setSelected} />

                    <CategoryHeader title="Extra" />
                    <Item title="Map" to="/maphome" selected={selected} setSelected={setSelected} />



                    {/* <MenuItem style={{ color: Theme.grey[100] }}>Calendar</MenuItem> */}
                </Menu>
            </Sidebar>
        </div>
    );
};

export default Sidebars;
