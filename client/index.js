import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./slices/cardSlice";

import styles from './scss/application.scss'

const store = configureStore({
    reducer: rootReducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />    
    </Provider>
);

