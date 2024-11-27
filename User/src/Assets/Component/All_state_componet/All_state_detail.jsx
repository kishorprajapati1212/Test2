import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./css/All_state_detail.css"
const All_state_detail = () => {
  const { section } = useParams(); // Get section from the URL
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]);

  // Fetch the state data from the backend
  const fetchState = async () => {
    try {
      const res = await axios.get(`${Backend_url}/All_state_with_one_image`);
      setStates(res.data); // Assuming the response is an array of states
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <>
      <h1>Hello {section}</h1>
      <div className="states-grid">
        {states.map((state) => (
          <div key={state.stateId} className="state-card">
            <div className="state-image">
              <img src={state.state_images[0]} alt={state.state_name} />
            </div>
            <div className="state-info">
              <p className="state-name">{state.state_name}</p>
              {/* Link to dynamic route with stateId and section */}
              <Link to={`/state/${state.stateId}/${section}`}>
                <button>Learn More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default All_state_detail;
