import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import MoreButton from '../components/recipeCardButtons/MoreButton.jsx';
import { deleteCard } from '../slices/cardSlice';

// tell daniel to have a key for each of the cards that he uses

function RecipeCard({ recipe, children, type, addHandler }) {
  // need to loop through the the fetch data
  console.log('type', type)
  // const [saveEdit, setSaveEdit] = useToggle();

  const dispatch = useDispatch();

  const [deleteButton, setDeleteButton] = React.useState(true);
  const setDeleteButtonLogic = () => {
    setDeleteButton((prev) => !prev);
    fetch(`/recipe/delete/${recipe.id}`, {
      method: 'DELETE',
    })
    .then((res) => dispatch(deleteCard(recipe)))
  };

  if (deleteButton)
    return (
      <Card sx={{ maxWidth: 600}}
      style={{ border: "none", boxShadow: "none" }}

       >
        <CardMedia
          component="img"
          alt="recipe image"
          // height="140"
          image={recipe.imagePath}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {recipe.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDisplay: "column" }}
        > 
          {type === 'addForm' ? <Button onClick={addHandler(recipe)}>Add something!</Button> : null}
          <MoreButton recipe={recipe}/>
          <Button size="small" onClick={setDeleteButtonLogic}>
            Delete
          </Button>
        </CardActions>
        {children}
      </Card>
    );
}

export default RecipeCard;
