import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from './App';
import cardReducer, { State as CardState } from "./slices/cardSlice";
import modalReducer, { State as ModalState } from "./slices/modalSlice";
import styles from './scss/application';


const store = configureStore({
    reducer: { card: cardReducer, 
                modal: modalReducer }
});

export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
  <Provider store={store}>
    <App />    
  </Provider>,
  document.getElementById('root')
);
