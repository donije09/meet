// Event.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event'; 
import  mockData  from '../mock-data'; 

describe('Event Component', () => {
  test('renders event title, start time, and location', () => {
    render(<Event event={mockData[0]} />);
    expect(screen.getByText(mockData[0].summary)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].created)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].location)).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    render(<Event event={mockData[0]} />);
    expect(screen.queryByText('hide details')).not.toBeInTheDocument();
  });

  test('shows the details section when the user clicks on the "show details" button', () => {
    render(<Event event={mockData[0]} />);
    fireEvent.click(screen.getByText('show details'));
    expect(screen.getByText('hide details')).toBeInTheDocument();
  });

  test('hides the details section when the user clicks on the "hide details" button', () => {
    render(<Event event={mockData[0]} />);
    fireEvent.click(screen.getByText('show details'));
    fireEvent.click(screen.getByText('hide details'));
    expect(screen.getByText('show details')).toBeInTheDocument();
  });
});
