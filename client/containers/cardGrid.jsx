// import Button from '@mui/material/Button';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, 
        AppBar, 
        Card, 
        CardActions, 
        CardContent, 
        CardMedia,  
        Grid, 
        Container } from '@mui/material';
import RecipeCard from '../components/recipeCard.jsx'

function CardGrid () {
    return (
        <>
            <header>
                <Typography align='center' variant='h1'>
                    {'Grandma\'s Cookbook'}
                </Typography>
            </header>
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography variant='h2' align='center' color='#FFE8D6'>
                            Recipes
                        </Typography>
                        <Typography variant='h5' align='center' color='grey' paragraph>
                            Ipsum lorem 
                        </Typography>
                        <div>
                            <Grid container spacing={2} justify='center'>
                                <RecipeCard/>
                                <RecipeCard/>
                                <RecipeCard/>
                                <RecipeCard/>
                                <RecipeCard/>
                                <RecipeCard/>
                            </Grid>
                        </div>

                    </Container>
                </div>
            </main>
        </>
    )
}

export default CardGrid