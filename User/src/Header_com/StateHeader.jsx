// States.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./State.css";

const States = () => {
  return (
    <div className="states">
      {/* Use Link to navigate to different state pages */}
      <Link to="/state_com/State">Gujarat</Link>
      <Link to="/state/chhattisgarh">Chhattisgarh</Link>
      <Link to="/state/madhya-pradesh">Madhya Pradesh</Link>
      <Link to="/state/bihar">Bihar</Link>
      <Link to="/state/puducherry">Puducherry</Link>
      <Link to="/state/odisha">Odisha</Link>
    </div>
  );
};

export default States;
