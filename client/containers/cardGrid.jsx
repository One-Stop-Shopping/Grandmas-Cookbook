import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
} from '@mui/material';
import RecipeCard from '../components/recipeCard.jsx';
import AddRecipeModal from '../components/addRecipePage/AddRecipeModal.jsx';
import { init } from '../slices/cardSlice';
import { useSelector, useDispatch } from 'react-redux';

function CardGrid() {
  const [openAddRecipe, setOpenAddRecipe] = React.useState(false);
  const handleCloseAddRecipe = () => {
    setOpenAddRecipe(false);
  };
  const handleOpenAddRecipe = () => {
    setOpenAddRecipe(true);
  };

    const { recipes } = useSelector(state=>state.card)
    const dispatch = useDispatch();

  useEffect(() => {
    fetch('/recipe/all', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        dispatch(init(data));
      });
  }, []);

    return (
        <main>
            <div>
              <Container className="classes.cardGrid" maxWidth="md">
                <Grid container spacing={4}>
                  {recipes.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <RecipeCard title={card.title} image={card.imagePath} />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              <Button onClick={handleOpenAddRecipe}>Get New Recipe</Button>
              <AddRecipeModal
                open={openAddRecipe}
                handleClose={handleCloseAddRecipe}
              />
            </div>
      </main>
  );
}

export default CardGrid;
