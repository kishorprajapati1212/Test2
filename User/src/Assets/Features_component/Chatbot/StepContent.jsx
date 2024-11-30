import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const StepContent = ({ step, states, selectedState, handleStateSelect, handleBudgetSelect, handlePlanTrip }) => {
  if (step === 1) {
    return (
      <Button onClick={handlePlanTrip} variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Plan Trip
      </Button>
    );
  }

  if (step === 2) {
    return (
      <FormControl fullWidth style={{ marginBottom: '15px' }}>
        <InputLabel id="state-select-label">Select State</InputLabel>
        <Select
          labelId="state-select-label"
          value={selectedState}
          onChange={(e) => handleStateSelect(e.target.value)}
          label="Select State"
        >
          {states.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (step === 3) {
    return (
      <div>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          Choose your budget:
        </Typography>
        {['Less than 25000', '25000 - 50000', '50000 - 100000', '100000 - 190000'].map((budget) => (
          <Button
            key={budget}
            variant="outlined"
            color="primary"
            onClick={() => handleBudgetSelect(budget)}
            style={{ margin: '5px' }}
          >
            {budget}
          </Button>
        ))}
      </div>
    );
  }

  return null;
};

export default StepContent;
