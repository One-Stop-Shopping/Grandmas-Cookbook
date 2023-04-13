// import Button from '@mui/material/Button';
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
  TextField,
} from '@mui/material';
import RecipeCard from '../components/recipeCard.jsx';
import AddRecipeModal from '../components/addRecipePage/AddRecipeModal.jsx';
import { init } from '../slices/cardSlice';
import { useSelector, useDispatch } from 'react-redux';

function CardGrid() {
  // States to support live filtering of the recipes
  const [filteredRecipes, setFilteredRecipes] = React.useState([]);
  const [filterKeyword, setFilterKeyword] = React.useState('');

  // State to support the add recipe modal.
  const [openAddRecipe, setOpenAddRecipe] = React.useState(false);

  // Handler for control the filter keyword in text field.
  const onFilterKeywordChange = (e) => setFilterKeyword(e.target.value);

  // Two handlers for open and close the add recipe modal.
  const handleCloseAddRecipe = () => {
    setOpenAddRecipe(false);
  };
  const handleOpenAddRecipe = () => {
    setOpenAddRecipe(true);
  };

  const { recipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/recipe/all', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        dispatch(init(data));
      });
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(filterKeyword.toLowerCase())
      )
    );
  }, [recipes, filterKeyword]);

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleOpenAddRecipe}>
                  Get New Recipe
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Find Your Recipe"
                  variant="standard"
                  value={filterKeyword}
                  onChange={onFilterKeywordChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Container className="classes.cardGrid" maxWidth="md">
                  <Grid container spacing={4}>
                    {filteredRecipes.map((card) => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <RecipeCard
                            title={card.title}
                            image={card.imagePath}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
                <AddRecipeModal
                  open={openAddRecipe}
                  handleClose={handleCloseAddRecipe}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
}

export default CardGrid;
