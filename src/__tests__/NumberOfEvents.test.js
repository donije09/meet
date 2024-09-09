// NumberOfEvents.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents'; 
describe('NumberOfEvents Component', () => {
  test('renders NumberOfEvents component with default value', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('32'); 
  });

  test('changes the number of events when user types in input', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(inputElement.value).toBe('10');
  });
});
