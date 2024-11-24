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

const StateHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Fetch all states
  const fetchStates = async () => {
    try {
      const response = await axios.get(`${Backend_url}/All_state_with_one_image`);
      setStates(response.data);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  // Handle delete operation
  const handleDelete = async () => {
    try {
      if (selectedState) {
        await axios.post(`${Backend_url}/Delete_state/${selectedState.stateId}`);
        setStates((prev) => prev.filter((state) => state.stateId !== selectedState.stateId));
        setPopupOpen(false);
        setSelectedState(null);
      }
    } catch (err) {
      console.error("Error deleting state:", err);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div style={{ padding: "20px", width: "auto" }}>
      <Typography variant="h4" gutterBottom>
        State Management
      </Typography>

      {/* Add State Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          component={Link}
          to="/Add_State"
        >
          + Add State
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>State Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Nickname</strong></TableCell>
              <TableCell><strong>Direction</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {states.map((state) => (
              <TableRow key={state.stateId}>
                <TableCell>{state.state_name}</TableCell>
                <TableCell>
                  {state.state_description.length > 30
                    ? `${state.state_description.slice(0, 30)}...`
                    : state.state_description}
                </TableCell>
                <TableCell>{state.state_nickname || "N/A"}</TableCell>
                <TableCell>{state.state_direction}</TableCell>
                <TableCell>
                  {state.state_images && state.state_images.length > 0 ? (
                    <img
                      src={state.state_images[0]}
                      alt={state.state_name}
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                  ) : (
                    "No Image"
                  )}
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
                    to={`/Update_State/${state.stateId}`}
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
                      setSelectedState(state);
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
        <Typography>Are you sure you want to delete this state?</Typography>
      </Deletepopup>
    </div>
  );
};

export default StateHome;
