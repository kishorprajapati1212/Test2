import React, { useState } from 'react';
import { Drawer, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import Theme from "../../Theme"

const Profilesidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const sidebarContent = (
    <Paper sx={{ backgroundColor: Theme.primary[10], minHeight: "100vh", width:isMobile?"100%" : "20%" }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: '1.5rem', marginBottom: '1rem', padding: '1rem', color:Theme.white[100] }}>
        Profile
      </Typography>
      <Divider />
      <List component="nav"  >
        <ListItem button component={Link} to={"/profile/home"} sx={{color:Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100]} }}>
          <ListItemText primary="My Account" />
        </ListItem>
        <ListItem button component={Link} to={"/profile/image"} sx={{color:Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100]} }}>
          <ListItemText primary="Image History" />
        </ListItem>
        <ListItem button component={Link} to={"/profile/video"} sx={{color:Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100]} }}>
          <ListItemText primary="Video History" />
        </ListItem>
        <ListItem button component={Link} to={"/profile/billing"} sx={{color:Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100]} }}>
          <ListItemText primary="Billing" />
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <>
      {isMobile ? (
        <IconButton onClick={toggleDrawer} sx={{ ml: 'auto', mr: 1 }}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      ) : null}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px'
          }
        }}
      >
        {sidebarContent}
      </Drawer>
      {!isMobile && sidebarContent}
    </>
  );
};

export default Profilesidebar;
