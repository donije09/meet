// NumberOfEvents.js
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChange = (event) => {
    setCurrentNOE(Number(event.target.value));
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
