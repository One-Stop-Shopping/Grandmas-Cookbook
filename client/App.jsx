import React, { useState } from 'react';
import { Typography, AppBar, Container, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardGrid from './containers/cardGrid.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFE8D6',
    },
    secondary: {
      main: '#DDBEA9',
    },
    ternary: {
      main: '#CB997E',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <header>
        <Typography align="center" variant="h1" color="primary">
          {"Grandma's Cookbook"}
        </Typography>
        <div className="actionHeader">
          <Typography variant="h2" align="center" color="primary">
            Recipes
          </Typography>
        </div>
      </header>
      <CardGrid />
    </ThemeProvider>
  );
}

export default App;
