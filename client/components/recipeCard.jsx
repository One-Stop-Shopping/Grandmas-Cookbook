import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// tell daniel to have a key for each of the cards that he uses

function RecipeCard() {

// need to loop through the the fetch data

// const [saveEdit, setSaveEdit] = useToggle();



const [saveEditButton, setSaveEditButton] = React.useState("Edit");
function setSaveEditButtonLogic (id) {
  if (saveEditButton === "Edit") {
    setSaveEditButton("Save");
  } else {
    setSaveEditButton("Edit");
  } 
};

const [deleteButton, setDeleteButton] = React.useState(true);
 const setDeleteButtonLogic = () => {
  setDeleteButton((prev) => !prev)
}

  if (deleteButton) return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      alt="recipe image"
      height="140"
      image="https://assets.epicurious.com/photos/6422f296a7a825dfcad11894/1:1/w_120,c_limit/CitrusStorage_HERO_032323_49551.jpg"
    />
    <CardContent>

      <Typography gutterBottom variant="h5" component="div" contenteditable="true">
        Recipe Name
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ipsum
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">More</Button>
      <Button size="small" onClick = {setSaveEditButtonLogic} >{saveEditButton}</Button>
      <Button size="small" onClick = {setDeleteButtonLogic}>Delete</Button>
    </CardActions>
  </Card>
  );

    }


export default RecipeCard;