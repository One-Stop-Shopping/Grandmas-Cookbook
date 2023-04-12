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
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../slices/cardSlice'

function CardGrid () {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const dispatch = useDispatch();
    const { recipes } = useSelector(state=>state);

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
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {card.title}
                                    </Typography>
                                    <Typography>
                                    {card.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>))}
                    </Grid>
                </Container>
            </div>
        </main>
    )
}

export default CardGrid