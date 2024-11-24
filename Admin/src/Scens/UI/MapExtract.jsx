import React, { useState } from 'react';

const MapExtract = () => {
  const [url, setUrl] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

  const extractCoordinates = (url) => {
    // Use regex to find latitude and longitude in the URL
    const regex = /@([-.\d]+),([-.\d]+)/;
    const match = url.match(regex);

    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      setCoordinates({ latitude, longitude });
    } else {
      setCoordinates({ latitude: '', longitude: '' });
      alert('Invalid URL. Please provide a valid Google Maps URL.');
    }
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleExtract = () => {
    extractCoordinates(url);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h3>Extract Coordinates</h3>
      <input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Enter Google Maps URL"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleExtract}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#71a3c1',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Extract
      </button>
      {coordinates.latitude && coordinates.longitude && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Latitude:</strong> {coordinates.latitude}</p>
          <p><strong>Longitude:</strong> {coordinates.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default MapExtract;
