// Language.js
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguage } from "../../../Language"; // Import the context

const Language = () => {
  const { language, setLanguage } = useLanguage(); // Get current language and setLanguage function from context
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleLanguageClose = () => {
    setOpen(false);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang); // Set the selected language globally using setLanguage
    handleLanguageClose();
  };

  return (
    <div>
      <LanguageIcon onClick={handleLanguageClick} style={{ cursor: "pointer" }} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
      >
        <MenuItem onClick={() => handleSelectLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => handleSelectLanguage("fr")}>French</MenuItem>
        <MenuItem onClick={() => handleSelectLanguage("es")}>Spanish</MenuItem>
        <MenuItem onClick={() => handleSelectLanguage("hi")}>Hindi</MenuItem>
      </Menu>
    </div>
  );
};

export default Language;
