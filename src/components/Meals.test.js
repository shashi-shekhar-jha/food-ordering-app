import React from "react";
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Meals from './Meals';

global.fetch= jest.fn();

const mockMeals=[
  {id:1,name:'Meal 1',price: ' 10.00' },
  {id:2,name:'Meal 2',price:'15.00'} , 
];

beforeEach(()=>{
    fetch.mockReset();
});

describe('testing Meals', () => { 
    test('renders meals components with multiplied prices', async() => { 
        fetch.mockResolvedValueOnce({
            json: async()=> mockMeals,
        });
        render(<Meals />);

        await waitFor(() => {
          expect(screen.getByText('$50.00')).toBeInTheDocument();
          expect(screen.getByText('$75.00')).toBeInTheDocument();
        });
    });
    

 })