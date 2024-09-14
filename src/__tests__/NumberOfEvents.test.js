import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('NumberOfEvents Component', () => {
  test('renders NumberOfEvents component with default value', () => {
    // Mock the props
    const mockSetCurrentNOE = jest.fn();
    const mockSetErrorAlert = jest.fn();  // Add mock for setErrorAlert

    render(
      <NumberOfEvents 
        currentNOE={6} 
        setCurrentNOE={mockSetCurrentNOE} 
        setErrorAlert={mockSetErrorAlert}  // Pass mock for setErrorAlert
      />
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('6'); // Verify default value is 6
  });

  test('changes the number of events when user types in input', () => {
    // Mock the props
    const mockSetCurrentNOE = jest.fn();
    const mockSetErrorAlert = jest.fn();  // Add mock for setErrorAlert

    render(
      <NumberOfEvents 
        currentNOE={6} 
        setCurrentNOE={mockSetCurrentNOE} 
        setErrorAlert={mockSetErrorAlert}  // Pass mock for setErrorAlert
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '10' } });
    
    // Verify setCurrentNOE was called with the new value
    expect(mockSetCurrentNOE).toHaveBeenCalledWith(10);

    // Since the input is valid, setErrorAlert should be called with an empty string
    expect(mockSetErrorAlert).toHaveBeenCalledWith('');
  });

  test('shows error alert when user types invalid input', () => {
    // Mock the props
    const mockSetCurrentNOE = jest.fn();
    const mockSetErrorAlert = jest.fn();  // Add mock for setErrorAlert

    render(
      <NumberOfEvents 
        currentNOE={6} 
        setCurrentNOE={mockSetCurrentNOE} 
        setErrorAlert={mockSetErrorAlert}  // Pass mock for setErrorAlert
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '-5' } });

    // Verify setErrorAlert was called with an error message
    expect(mockSetErrorAlert).toHaveBeenCalledWith('Please enter a valid number greater than 0.');

    // Verify setCurrentNOE was not called, as the input is invalid
    expect(mockSetCurrentNOE).not.toHaveBeenCalled();
  });
});
