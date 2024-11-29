import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Deletepopup from "../../Global_Component/Deletepopup";

const ShortHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [shorts, setShorts] = useState([]);
  const [selectedShort, setSelectedShort] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const fetchShorts = async () => {
    try {
      const response = await axios.get(`${Backend_url}/Get_all_Shorts`);
      setShorts(response.data);
    } catch (err) {
      console.error("Error fetching shorts:", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedShort) {
        await axios.get(`${Backend_url}/deleteShort/${selectedShort.videoId}`);
        setShorts((prev) => prev.filter((short) => short.videoId !== selectedShort.videoId));
        setPopupOpen(false);
        setSelectedShort(null);
      }
    } catch (err) {
      console.error("Error deleting short:", err);
    }
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  return (
    <div style={{ padding: "20px", width: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Shorts Management
      </Typography>

      {/* Add Shorts Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          component={Link}
          to="/Add_short"
        >
          + Add Shorts
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short Title</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Creator Name</TableCell>
              <TableCell>Image</TableCell> {/* Add the Image column */}
              <TableCell>Video URL</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shorts.map((short) => (
              <TableRow key={short.videoId}>
                <TableCell>{short.short_title}</TableCell>
                <TableCell>{short.short_description.slice(0, 15)}</TableCell>
                <TableCell>{short.creater_name}</TableCell>

                {/* Image Column */}
                <TableCell>
                  {short.short_image ? (
                    <img
                      src={short.short_image} // Assuming `short_image` is the image URL
                      alt={short.short_title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    <Typography>No Image</Typography>
                  )}
                </TableCell>

                <TableCell>
                  <a
                    href={short.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {short.short_url.slice(0, 15)}...
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      marginRight: "10px",
                      "&:hover": { backgroundColor: "#006400" },
                    }}
                    to={`/Update_short/${short.videoId}`}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      "&:hover": { backgroundColor: "#8B0000" },
                    }}
                    onClick={() => {
                      setSelectedShort(short);
                      setPopupOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Popup */}
      <Deletepopup
        open={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title="Confirm Delete"
        onConfirm={handleDelete}
      >
        <Typography>Are you sure you want to delete this short?</Typography>
      </Deletepopup>
    </div>
  );
};

export default ShortHome;
