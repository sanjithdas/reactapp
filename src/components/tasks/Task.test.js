import React from 'react';
import { Provider } from "react-redux";
import store from "../../store";
import { render, screen, fireEvent } from '@testing-library/react';
import Task from "./Task";

test('create task when add button clicked', ()=>{
  render(<Provider store={store}><Task/></Provider>);
  const addButton = screen.getByRole('button', {name: 'Add'});
  expect(addButton).toBeInTheDocument();
  fireEvent.click(addButton);
  //expect()
  
})