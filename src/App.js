// App.js 
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(6);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState(""); // ErrorAlert state
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    // Update warning message based on online status
    if (!navigator.onLine) {
      setWarningAlert('You are offline. The displayed list has been loaded from the cache.');
    } else {
      setWarningAlert(''); // Clear warning message when online
    }

    fetchData();
  }, [currentCity, currentNOE]); // Added currentNOE to dependencies

  const fetchData = async () => {
    const allEvents = await getEvents();
    if (!Array.isArray(allEvents)) {
      console.error('getEvents did not return an array:', allEvents);
      setEvents([]);
      return;
    }
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null} {/* Render WarningAlert */}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents 
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} // Pass the setErrorAlert function
      />
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventList events={events} />
    </div>
  );
};

export default App;
