import React from 'react';
import Event from './Event'; // Assuming Event component is being used

const EventList = ({ events = [] }) => {
  return (
    <ul id="event-list">
      {events.map((event) => (
        <li key={event.id} className="event">
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
