// src/features/showHideAnEventsDetails.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Event from '../components/Event'; // Assuming the Event component is in src/components/Event.js

// Sample event data
const event = {
  summary: 'React Conference',
  created: '2024-09-01',
  location: 'San Francisco, CA',
};

describe('Show/Hide Event Details', () => {
  test('User can expand an event to see its details', async () => {
    const { getByText, queryByText } = render(<Event event={event} />);

    // Verify the "show details" button is rendered
    const showDetailsButton = getByText('show details');
    expect(showDetailsButton).toBeInTheDocument();

    // Click the "show details" button
    fireEvent.click(showDetailsButton);

    // Wait for the details to be rendered
    await waitFor(() => expect(queryByText('Details content here...')).toBeInTheDocument());

    // Verify the "hide details" button is rendered
    expect(getByText('hide details')).toBeInTheDocument();
  });

  test('User can hide the event details', async () => {
    const { getByText, queryByText } = render(<Event event={event} />);

    // Click the "show details" button
    fireEvent.click(getByText('show details'));

    // Wait for the details to appear
    await waitFor(() => expect(queryByText('Details content here...')).toBeInTheDocument());

    // Click the "hide details" button
    fireEvent.click(getByText('hide details'));

    // Verify that the details are no longer displayed
    await waitFor(() => expect(queryByText('Details content here...')).not.toBeInTheDocument());
  });
});
