import React from 'react';
import ReactDOM from 'react-dom/client'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from './App.jsx';
import cardReducer from "./slices/cardSlice";
import modalReducer from "./slices/modalSlice"

import styles from './scss/application.scss'

const store = configureStore({
    reducer: { card: cardReducer, 
                modal: modalReducer }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />    
    </Provider>
);

