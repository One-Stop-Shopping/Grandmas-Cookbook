import React, { useState } from "react";
import { Typography,  
    AppBar,
    Container,
    Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from './containers/cardGrid';
import Modal from './components/modal'

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFE8D6'
        },
        secondary: {
            main: '#DDBEA9'
        }, 
        ternary: {
            main: '#CB997E'
        }
    }
})

// eslint-disable-next-line no-unused-vars
function App() {
    const [ modalBool, showModal ] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <header>
                <Typography align='center' variant='h1' color='primary'>
                    {'Grandma\'s Cookbook'}
                </Typography>
                <div className="actionHeader">
                        <Typography variant='h2' align='center' color='secondary'>
                            Recipes
                        </Typography>
                        <Modal/>
                </div>
            </header>
            <Grid/>
        </ThemeProvider>
    );
};

export default App;