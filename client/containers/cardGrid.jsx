import React, { useEffect } from 'react';
import { Typography,  
        Card, 
        Grid, 
        Container } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux'
import RecipeCard from '../components/recipeCard.jsx'
import { init } from '../slices/cardSlice';
import UrlAddForm from '../components/forms/urlAddForm.jsx';


function CardGrid () {

    const { recipes } = useSelector(state=>state.card)
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
                <UrlAddForm/>
            </div>
            
        </main>
    )
}

export default CardGrid;