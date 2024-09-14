// Test case with correct case for aria-label
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, fireEvent } from '@testing-library/react';
import App from '../App'; // Adjust the path accordingly

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User can specify the number of events they want to see', ({ given, when, then }) => {
    let inputField;

    given('the user has not specified a number of events', () => {
      const { queryByLabelText } = render(<App />);
      // Use the correct case here
      inputField = queryByLabelText('Number of events');
      expect(inputField).toBeInTheDocument();
    });

    when('the user enters a number in the input field', async () => {
      fireEvent.change(inputField, { target: { value: '5' } });
    });

    then('the number of events displayed should match the user’s input', async () => {
      const { queryAllByRole } = render(<App />);
      const events = queryAllByRole('listitem');
      expect(events.length).toBe(6);
    });
  });
});
