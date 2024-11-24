import React, { useState, useEffect } from "react";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const WarHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [warHistory, setWarHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch war history from the backend
  const fetchWarHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Backend_url}/getWarHistory`);
      setWarHistory(response.data);
    } catch (err) {
      setError("Failed to fetch war history.");
      console.error("Error fetching war history:", err);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch war history on component mount
  useEffect(() => {
    fetchWarHistory();
  }, [Backend_url]);

  // Handle the deletion of a war history entry
  const handleDelete = async (historyId) => {
    try {
      // Send delete request to the backend
      const response = await axios.get(`${Backend_url}/deleteWarHistory/${historyId}`);

      if (response.status === 200) {
        // After successful delete, fetch the updated war history
        fetchWarHistory();
        console.log("Deleted successfully:", response.data);
      }
    } catch (err) {
      console.error("Error deleting war history:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        War Information
      </Typography>

      {/* Add new War History Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        component={Link}
        to="/Add_War"
      >
        + Add War History
      </Button>

      {/* Error handling */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display loading state */}
      {loading ? (
        <Typography>Loading war history...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>War Name</TableCell>
                <TableCell>Start Year</TableCell>
                <TableCell>End Year</TableCell>
                <TableCell>War Place</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warHistory.map((war) => (
                <TableRow key={war.historyId}>
                  <TableCell>{war.war_name}</TableCell>
                  <TableCell>{war.start_war}</TableCell>
                  <TableCell>{war.end_war}</TableCell>
                  <TableCell>{war.war_place}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/Update_War/${war.historyId}`}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(war.historyId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default WarHome;
