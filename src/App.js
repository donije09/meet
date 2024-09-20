import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart'; // Import the pie chart
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(6); // Default number of events
  const [allLocations, setAllLocations] = useState([]); // All available event locations
  const [currentCity, setCurrentCity] = useState('See all cities'); // Default city filter
  const [infoAlert, setInfoAlert] = useState(""); // State for displaying info alerts
  const [errorAlert, setErrorAlert] = useState(""); // State for displaying error alerts
  const [warningAlert, setWarningAlert] = useState(""); // State for warning alerts

  // Handle fetching events and updating alerts
  useEffect(() => {
    if (!navigator.onLine) {
      setWarningAlert('You are offline. The displayed list has been loaded from the cache.');
    } else {
      setWarningAlert(''); // Clear warning message when online
    }

    fetchData(); // Fetch the event data
  }, [currentCity, currentNOE]); // Fetch data again when city or number of events changes

  const fetchData = async () => {
    const allEvents = await getEvents(); // Fetch all events

    if (!Array.isArray(allEvents)) {
      console.error('getEvents did not return an array:', allEvents);
      setEvents([]); // Set events to empty array if there's an error
      return;
    }

    // Filter events based on selected city
    const filteredEvents = currentCity === 'See all cities'
      ? allEvents
      : allEvents.filter((event) => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE)); // Limit events to the selected number
    setAllLocations(extractLocations(allEvents)); // Extract all unique event locations
  };

  return (
    <div className="App">
      {/* Alerts section */}
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
      </div>

      {/* City search input and event controls */}
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />

      {/* Charts section (scatter and pie charts) */}
      <div className="charts-container">
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} /> {/* Render the pie chart */}
      </div>

      {/* Event list */}
      <EventList events={events} />
    </div>
  );
};

export default App;
