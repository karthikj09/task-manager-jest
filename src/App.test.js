import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';


describe('App Component', () => {

  it('Renders Todo List', () => {
    render(<App />);
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('Deletes a todo when delete button is clicked', () => {
    render(<App />);
    const inputElement = screen.getByTestId('input-box');
    const inputButton = screen.getByRole('button', { name: 'Add Todo' });
  
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(inputButton);

    const deleteButton = screen.getByTestId('deleteBtn');
    fireEvent.click(deleteButton);
  
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  it('Adds a todo when input is not empty', () => {
    render(<App />);
    const inputElement = screen.getByTestId('input-box');
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    const inputButton = screen.getByRole('button',{name : 'Add Todo'});
    fireEvent.click(inputButton);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('Does not add a todo when input is empty',() => {
    render(<App />);
    const inputElement = screen.getByTestId('input-box');
    const inputButton = screen.getByRole('button', { name: 'Add Todo' });
    fireEvent.click(inputButton);
    expect(inputElement.value).toBe('');
  });

  it('Check JSON Typicode call', async () => {
    const mockUserData = {
      name: 'Clementina DuBuque',
      email: 'Rey.Padberg@karina.biz',
    };
  
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUserData),
    });
  
    render(<App />);
  
    const apiButton = screen.getByRole('button', { name: 'Click' });
    fireEvent.click(apiButton);
    
    await act(async()=> { 
      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/10'
      );
    });
    expect(screen.getByText(/Name : Clementina DuBuque/i)).toBeInTheDocument();
    expect(screen.getByText(/Email : Rey.Padberg@karina.biz/i)).toBeInTheDocument();
  });

});
