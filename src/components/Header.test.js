import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import UserProgressContext from '../store/UserProgressContext';
import { CartProvider, useCart } from '../store/CartContext';

jest.mock('react', () => ({
    ...jest.requireActual('react'), 
    useCart: jest.fn(),
  }));

  const mockCartContextValue = {
    items: []
  };
  
  const mockUserProgressContextValue = {
    showCart: jest.fn(),
  };
describe('testing Header Component', () => { 
    
  test('test 1', () => { 
    render(<Header />);
    expect(screen.getByAltText('A restaurant')).toBeInTheDocument();
    expect(screen.getByText('ReactFood')).toBeInTheDocument();
    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
  })  
  // test('checking cart button',()=>{
  //   render(<Header/>);
  //   const cartButton=screen.getByRole('button',{name:/cart/i});

  //   fireEvent.click(cartButton);
  //   expect(mockUserProgressContextValue.showCart).toHaveBeenCalled();
  // });
})