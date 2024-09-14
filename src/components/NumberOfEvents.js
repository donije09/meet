// NumberOfEvents.js
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const handleInputChange = (event) => {
    const value = Number(event.target.value);

    if (isNaN(value) || value <= 0) {
      setErrorAlert('Please enter a valid number greater than 0.'); // Set error alert
    } else {
      setErrorAlert(""); // Clear error alert
      setCurrentNOE(value); // Update the number of events if valid
    }
  };

  return (
    <div className="number-of-events">
      <input
        type="number"
        role="textbox"
        aria-label="Number of events"
        value={currentNOE}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
