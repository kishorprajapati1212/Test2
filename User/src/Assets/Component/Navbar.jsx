import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Language from "./Navbar/Language";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    en: { home: "Home", about: "About", contact: "Contact", login: "Login", signup: "Sign Up", logout: "Logout" },
    fr: { home: "Accueil", about: "À propos", contact: "Contact", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion" },
    es: { home: "Inicio", about: "Acerca de", contact: "Contacto", login: "Iniciar sesión", signup: "Registrarse", logout: "Cerrar sesión" },
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Cultrual");
    const oneuser = JSON.parse(userFromLocalStorage);
    setUser(oneuser);
    setIsLoggedIn(!!userFromLocalStorage);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("Cultrual");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const translate = (key) => translations[language][key] || key;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Perform search or navigate to search results
    console.log("Search Query:", searchQuery);
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="sticky" sx={{ backgroundColor: "orange", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ fontWeight: "bold", textDecoration: "none", color: "inherit" }}
          >
            Indian Heritage
          </Typography>

          {/* Search bar */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                paddingLeft: "8px",
                width: "100%",
                maxWidth: "300px",
                marginLeft:"100px"
              }}
            />
            <IconButton sx={{ padding: "10px" }} onClick={handleSearchSubmit}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Language Selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Language currentLanguage={language} onLanguageChange={handleLanguageChange} />
          </Box >

          {/* User Profile or Auth Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <>
                <IconButton component={Link} to="/profile">
                  <AccountCircleIcon sx={{ color: "#fff" }} />
                </IconButton>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{ color: "#000", borderColor: "#000", "&:hover": { backgroundColor: "#f1f1f1" } }}
                >
                  {translate("logout")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ color: "#000", borderColor: "#000", "&:hover": { backgroundColor: "#f1f1f1" } }}
                >
                  {translate("login")}
                </Button>
                <Button
                  component={Link}
                  to="/sigin_home"
                  variant="contained"
                  sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
                >
                  {translate("signup")}
                </Button>
              </>
            )}
          </Box>

          {/* Menu Button */}
          <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} 
        sx={{
          "& .MuiDrawer-paper": { width: "240px", padding: "10px", backgroundColor: "transparent", },
        }}>
        <List>
          {[
            { text: translate("home"), icon: <HomeIcon />, link: "/" },
            { text: translate("about"), icon: <InfoIcon />, link: "/about" },
            { text: translate("contact"), icon: <ContactMailIcon />, link: "/contact" },
            { text: "Map", icon: <ContactMailIcon />, link: "/map" },
            { text: "Watch_short", icon: <ContactMailIcon />, link: "/See_short" },
            { text: "Add_Short", icon: <ContactMailIcon />, link: "/Add_short", role: "Artist" },
          ]
            .filter(item => !item.role || user?.role === item.role) // Show item if no role or user has the required role
            .map((item, index) => (
              <ListItem
                key={index}
                button
                component={Link}
                to={item.link}
                onClick={toggleDrawer}
                sx={{backgroundColor:"transparent"}}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
