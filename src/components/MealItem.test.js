import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MealItem from './MealItem';
import CartContext from '../store/CartContext';

jest.mock('../store/CartContext', () => ({
  __esModule: true,
  default: jest.fn(),
  Consumer: ({ children }) => children({
    items: [],
    addItem: jest.fn(),
  }),
}));
jest.mock('../util/formatting.js', () => ({
  __esModule: true,
  currencyFormatter: {
    format: jest.fn((value) => `$${value.toFixed(2)}`),
  },
}));

const mockMeal = {
  id: 1,
  name: 'Test Meal',
  price: 10.0,
  description: 'Test Description',
  image: 'test-image.jpg',
};

describe('MealItem Component', () => {
  test('renders MealItem component with correct details', () => {
    const { container } = render(<MealItem meal={mockMeal} />);
    expect(screen.getByText('Test Meal')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.queryByText('Quantity:')).toBeNull();

    CartContext.mockImplementationOnce(({ children }) => children({
      items: [{ id: 1, quantity: 2 }],
      addItem: jest.fn(),
    }));

    render(<MealItem meal={mockMeal} />, { container });

    expect(screen.getByText('Quantity:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

});
