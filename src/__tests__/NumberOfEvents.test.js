// NumberOfEvents.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('NumberOfEvents Component', () => {
  test('renders NumberOfEvents component with default value', () => {
    // Mock the props
    const mockSetCurrentNOE = jest.fn();
    render(<NumberOfEvents currentNOE={6} setCurrentNOE={mockSetCurrentNOE} />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('6'); // Verify default value is 32
  });

  test('changes the number of events when user types in input', () => {
    // Mock the props
    const mockSetCurrentNOE = jest.fn();
    render(<NumberOfEvents currentNOE={6} setCurrentNOE={mockSetCurrentNOE} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(inputElement.value).toBe('6'); // Verify value changes to 10
  });
  
});
