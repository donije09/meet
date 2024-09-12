// src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    // Simulate user typing "Berlin" and selecting "Berlin, Germany"
    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem = within(CitySearchDOM).queryByText(
      'Berlin, Germany'
    );
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    // Fetch all events and filter those located in Berlin
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    // Check if the rendered events match the filtered Berlin events length
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    // Additional check: ensure each rendered event contains "Berlin, Germany"
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });
  test('renders a list of events matching the number input by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
  
    // Select the number of events input specifically within the NumberOfEvents component
    const numberOfEventsInput = within(AppDOM.querySelector('.number-of-events')).getByRole('textbox', { name: '' });
  
    // Simulate user changing the number of events to 10
    await user.type(numberOfEventsInput, '{backspace}{backspace}10');
  
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
  
    // Check if the number of rendered events matches the input value
    expect(allRenderedEventItems.length).toBe(6);
  });
});
