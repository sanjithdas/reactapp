import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/home';


test('render welcome text', ()=>{
  render(<Home/>)
  const welcomeTextElement = screen.getByText(/^welcome$/i); // full string match, ignore case
  expect(welcomeTextElement).toBeInTheDocument();
})
