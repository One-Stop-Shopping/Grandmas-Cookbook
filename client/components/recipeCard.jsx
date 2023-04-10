import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import CssBaseline from '@mui/material/CssBaseline';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function recipeCard() {

  
    

  return (
    
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="recipe image"
        height="140"
        image="https://assets.epicurious.com/photos/6422f296a7a825dfcad11894/1:1/w_120,c_limit/CitrusStorage_HERO_032323_49551.jpg"
      />
      <CardContent>

        <Typography gutterBottom variant="h5" component="div">
          Recipe Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ipsum
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
        <Button size="small">Save</Button>
      </CardActions>
    </Card>
  );
}


export default recipeCard;