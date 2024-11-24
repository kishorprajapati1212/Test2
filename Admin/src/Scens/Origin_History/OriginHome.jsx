import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePopup from "../../Global_Component/Deletepopup"; // Import DeletePopup component

const OriginHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [origin, setOrigin] = useState([]);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [originToDelete, setOriginToDelete] = useState(null);

  // Fetch origin data from the backend
  const fetchOrigin = async () => {
    try {
      const response = await axios.get(`${Backend_url}/Get_all_origin_history`);
      setOrigin(response.data);
    } catch (err) {
      console.error("Error fetching origin:", err);
    }
  };

  useEffect(() => {
    fetchOrigin();
  }, []);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await axios.get(`${Backend_url}/Delete_origin/${originToDelete.originhistoryId}`);
      fetchOrigin(); // Refresh the list after deletion
      setOpenDeletePopup(false); // Close the popup
    } catch (err) {
      console.error("Error deleting origin:", err);
    }
  };

  // Open delete confirmation popup
  const openDeleteConfirmation = (origin) => {
    setOriginToDelete(origin);
    setOpenDeletePopup(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Origin Management
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          component={Link}
          to="/Add_origin"
        >
          + Add War
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Origin State Name</TableCell>
              <TableCell>Origin Description</TableCell>
              <TableCell>State Images</TableCell>
              <TableCell>Origin Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {origin.map((origin) => (
              <TableRow key={origin.originhistoryId}>
                <TableCell>{origin.origin_state_name}</TableCell>
                <TableCell>{origin.origin_description.slice(0, 15)}...</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {Array.isArray(origin.origin_image) ? origin.origin_image.slice(1, 2).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Origin ${index + 1}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    )) : null}
                  </div>
                </TableCell>
                <TableCell>{origin.origin_time}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginRight: "10px" }}
                    component={Link}
                    to={`/Update_origin/${origin.originhistoryId}`}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => openDeleteConfirmation(origin)}
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
      <DeletePopup
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        title="Delete Origin"
        onConfirm={handleDelete}
      >
        <Typography>
          Are you sure you want to delete this origin?
        </Typography>
      </DeletePopup>
    </div>
  );
};

export default OriginHome;
