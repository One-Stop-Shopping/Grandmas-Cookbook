import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Backdrop} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setUrlResult, clearUrlResult } from '../../slices/modalSlice';
import { addCard } from '../../slices/cardSlice'

function UrlAddForm() {
    const fieldValue = useRef('');
    const dispatch = useDispatch();
    const {urlScrape} = useSelector(state=>state.modal)
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    // const { ingredientList, directions, title} = urlScrape
    
    async function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        await fetch(`http://localhost:3000/recipe/scrapeUrl/?url=${fieldValue.current.value}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUrlResult(data))
        })
        .then(() => handleClose())
    };

    function addHandler(e) {
        e.preventDefault();
        handleOpen();
        fetch('/recipe/add', 
            {method: 'POST', 
            body: JSON.stringify(urlScrape),
            headers: {
                'Content-type': 'application/json',
            }})
            .then(res => res.json())
            .then(data => dispatch(addCard(data)))
            .then(() => handleClose())
            .then(() => dispatch(clearUrlResult()))
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

            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

export default UrlAddForm;