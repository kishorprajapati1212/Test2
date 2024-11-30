import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import Theme from '../../Theme';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar(false)}
      PaperProps={{ sx: { backgroundColor: 'rgba(266,255,288,0.1)', backdropFilter:"blur(8px)",width: '350px' } }}  
    >
      <IconButton 
        onClick={toggleSidebar(false)} 
        sx={{ position: 'right', top: '10px', right: '10px', color: Theme.white[100] }}
      >
        <CloseIcon />
      </IconButton>
      <List sx={{ mt: "10%",  color: Theme.white[100] }}>
        <ListItem button component={Link} to="/home" sx={{ color: Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100] }}}>
          <ListItemIcon>
            <HomeIcon sx={{color: Theme.white[100],}}/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/profile/home" sx={{ color: Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100] }}}>
          <ListItemIcon>
            <AccountCircleIcon sx={{color: Theme.white[100],}}/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem button component={Link} to="/settings" sx={{ color: Theme.white[100], '&:hover': { backgroundColor: Theme.grey[100] }}}>
          <ListItemIcon>
            <SettingsIcon sx={{color: Theme.white[100],}}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
