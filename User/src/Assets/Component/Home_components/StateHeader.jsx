import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/State.css";
import axios from "axios";

const States = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]); // State to store fetched data

  // Fetch states from the backend
  const fetchState = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Get_all_State_names`);
      setStates(res.data); // Update states
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <div className="states">
      {/* <h3>States</h3> */}
      {/* Render links dynamically */}
      {states.map((state) => (
        <Link
          key={state._id}
          to={`/state/${state.stateId}`}
          className="state-link"
        >
          {state.state_name.trim()}
        </Link>
      ))}
    </div>
  );
};

export default States;
