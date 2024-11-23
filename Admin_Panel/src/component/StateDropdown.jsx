import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import axios from "axios";

const StateDropdown = ({ onStateChange, selectedState }) => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch states from API
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${Backend_url}/Get_all_State_names`);
        setStates(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setError("Failed to fetch state data.");
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = (event) => {
    const selectedState = states.find((state) => state.stateId === event.target.value);
    onStateChange(selectedState); // Pass the selected state back to the parent
  };

  if (loading) return <CircularProgress />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select value={selectedState?.stateId || ""} onChange={handleStateChange}>
        {states.map((state) => (
          <MenuItem key={state.stateId} value={state.stateId}>
            {state.state_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StateDropdown;
