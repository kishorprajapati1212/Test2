import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Theme from '../../Theme';
import Sidebar from './Sidebar';

export function getuser() {
  // Get the string from localStorage
  let user = localStorage.getItem("userdata");
  // Check if the user data exists and is parseable
  if (user) {
      // Parse the string into an object
      user = JSON.parse(user);
  }else {
    user = null;
  }

  return user;
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = (open) => () => {
    setSidebarOpen(open);
  };

  useEffect(() => {
    if (location.pathname === "/home") {
      const collectuserdata = JSON.stringify(localStorage.getItem("userdata"));
      setUserData(JSON.parse(collectuserdata));
    } else {
      setIsLoggedIn(false);
      // setUserData(null);
    }
    const collectuserdata = JSON.stringify(localStorage.getItem("userdata"));
    setUserData(JSON.parse(collectuserdata));
  }, [location.pathname]);

  const handleLogOut = () => {
    localStorage.removeItem('userdata');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };
  // console.log(isLoggedIn)
  // console.log(userData)

  return (
    <Box sx={{ flexGrow: 1, m:"10px 10px " }}>
      <AppBar position="relative" sx={{ background: 'linear-gradient(135deg, rgba(255, 55, 255, 0.1), rgba(55, 55, 250, 0.1))', borderRadius: '100px' }}>
        {/* <Link to="/Test">Hello</Link> */}
        <Toolbar>
          {userData ?
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar(true)}>
              <MenuIcon />
            </IconButton> : ""}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/vite.svg" alt="LOGO" style={{ marginTop: '10px' }} />
          </Typography>

          <IconButton variant="h6" sx={{ cursor: "pointer", fontSize: "40px", color: Theme.white[100] }} component={Link} to="/home">
            <HomeOutlinedIcon sx={{ fontSize: "30px" }} />
          </IconButton>

          {/* <IconButton variant="h6" sx={{ cursor: "pointer", fontSize: "40px", color: "red" }} component={Link} to="/test_gen">
            <HomeOutlinedIcon sx={{ fontSize: "30px" }} />
          </IconButton> */}

          {userData ? (
            <>
              <>
                <Button variant="contained" sx={{ ml: 2 }} onClick={handleLogOut}>
                  Logout
                </Button>
              </>
              <Button color="inherit" sx={{ borderRadius: '50%', ml: '2px' }} component={Link} to="/profile/home">
                <AccountCircleOutlinedIcon sx={{ fontSize: '40px' }} />
              </Button>
            </>
          ) : (
            <Button variant="contained" sx={{ ml: 2 }} component={Link} to="/login">
              Login
            </Button>
          )}

          
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Box>
  );
};

export default Navbar;
