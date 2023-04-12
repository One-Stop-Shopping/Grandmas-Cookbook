// import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography,  
        AppBar,
        Card, 
        CardContent, 
        Grid, 
        Container } from '@mui/material';
import RecipeCard from '../components/recipeCard.jsx'
import { init } from '../slices/cardSlice'
import { useSelector, useDispatch} from 'react-redux'



function CardGrid () {

    const { recipes } = useSelector(state=>state)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(init({ title: 'Title', desc: 'This should be a description', instructions:'instructions' }))
    }, [])

    return (
        <main>
            <div>
                <Container className='classes.cardGrid' maxWidth="md">
                    <Grid container spacing={4}>
                        {recipes.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                <RecipeCard/>
                            </Card>
                        </Grid>))}
                    </Grid>
                </Container>
            </div>
        </main>
    )
}

export default CardGrid