import React, { useState, useEffect } from 'react';

// User-side component for adding state history
const AddHistoryForm = () => {
  // State to store available states (to populate the select dropdown)
  const [states, setStates] = useState([]);
  // State to store selected state name
  const [selectedState, setSelectedState] = useState('');
  // State to manage history entries (startYear, endYear, description)
  const [historyEntries, setHistoryEntries] = useState([
    { startYear: '', endYear: '', description: '' },
  ]);

  // Fetch available states from your API or database
  useEffect(() => {
    // Example of fetching state data (replace with your API)
    fetch('http://localhost:3000/api/states') // Adjust this URL as per your backend API
      .then(response => response.json())
      .then(data => setStates(data)) // Assuming data is an array of states
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  // Handle input change for history fields
  const handleHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHistory = [...historyEntries];
    updatedHistory[index][name] = value;
    setHistoryEntries(updatedHistory);
  };

  // Add a new history entry (new set of fields)
  const addHistoryEntry = () => {
    setHistoryEntries([...historyEntries, { startYear: '', endYear: '', description: '' }]);
  };

  // Remove a history entry by index
  const removeHistoryEntry = (index) => {
    const updatedHistory = historyEntries.filter((_, i) => i !== index);
    setHistoryEntries(updatedHistory);
  };

  // Handle submit form (send data to backend)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to the API
    const historyData = {
      state_name: selectedState,
      history: historyEntries,
    };
    console.log("History:" + historyData.history)

    // Send data to the backend API
    fetch('http://localhost:3000/add-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('History added:', data);
        alert('History added successfully!');
      })
      .catch((error) => {
        console.error('Error adding history:', error);
        alert('Error adding history!');
      });
  };

  // Handle state selection change
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <>
       <h1>Test Video from Cloudinary</h1>
  <video controls autoplay muted width="600">
    <source src="https://res.cloudinary.com/demo/video/upload/v1632070104/sample.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

      </>
      );
};

      export default AddHistoryForm;
