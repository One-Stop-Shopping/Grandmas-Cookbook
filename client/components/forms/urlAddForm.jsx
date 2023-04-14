import React, { useRef } from 'react';
import { TextField, Button, Box, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setUrlResult } from '../../slices/modalSlice';
import { addCard } from '../../slices/cardSlice'

function UrlAddForm() {
    const fieldValue = useRef('');
    const dispatch = useDispatch();
    const {urlScrape} = useSelector(state=>state.modal)
    // const { ingredientList, directions, title} = urlScrape
    
    async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`http://localhost:3000/recipe/scrapeUrl/?url=${fieldValue.current.value}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUrlResult(data))
        });
    };

    function addHandler(e) {
        e.preventDefault()
        dispatch(addCard(urlScrape))
    }


    return (
        <Box>
            <TextField id="outlined-basic" inputRef={fieldValue}/>
            <Button onClick={handleSubmit}>Submit</Button>
            {!urlScrape.ingredientList ? null : 
            <>
                <Typography variant='h5'>
                    {urlScrape.title}
                </Typography>
                <Typography variant='h6'>
                    ingredients
                </Typography>
                { !urlScrape.ingredientList ? null : urlScrape.ingredientList.map((item, i=0) => {
                    i += 1;
                    return <li key={`ingredient${i}`}>{item}</li> 
                } 
                )}
                <Typography variant='h6'>
                    directions
                </Typography>
                { !urlScrape.directions ? null : urlScrape.directions.map((item, i = 0) => {
                    i += 1;
                    return <li key={`direction${i}`}>{item}</li> 
                    }) 
                }
                <Button onClick={addHandler}>Add to my Recipes</Button>   
            </>
            }
        </Box>
    );
}

export default UrlAddForm;