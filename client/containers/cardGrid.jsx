// import Button from '@mui/material/Button';
import * as React from 'react';
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

function CardGrid() {
  const [openAddRecipe, setOpenAddRecipe] = React.useState(false);
  const handleCloseAddRecipe = () => {
    setOpenAddRecipe(false);
  };
  const handleOpenAddRecipe = () => {
    setOpenAddRecipe(true);
  };

  return (
    <>
      <header>
        <Typography align="center" variant="h1">
          {"Grandma's Cookbook"}
        </Typography>
      </header>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="#FFE8D6">
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="grey" paragraph>
              Ipsum lorem
            </Typography>
            <div>
              <Grid container spacing={2} justify="center">
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <Button onClick={handleOpenAddRecipe}>Get New Recipe</Button>
              </Grid>
            </div>
          </Container>
          <AddRecipeModal
            open={openAddRecipe}
            handleClose={handleCloseAddRecipe}
          />
        </div>
      </main>
    </>
  );
}

export default CardGrid;
