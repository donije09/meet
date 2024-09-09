// NumberOfEvents.js
import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    setNumberOfEvents(event.target.value);
  };

  return (
    <div className="number-of-events">
      <input
        type="number"
        role="textbox"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
