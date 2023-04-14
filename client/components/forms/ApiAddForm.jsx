import React, { useRef } from 'react';
import { TextField, Button, Box, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setKeywordResult } from '../../slices/modalSlice';
import { addCard } from '../../slices/cardSlice'

function APIAddForm() {
    const fieldValue = useRef('');
    const dispatch = useDispatch();
    const { KeywordResults } = useSelector(state=>state.modal)
    
    async function handleSubmit(e) {
        e.preventDefault();
        const keywords = JSON.stringify(fieldValue.current.value)
        await fetch(`http://localhost:3000/tasty/tagQuery/?from=0&size=50&tags=[]&q=${keywords}'`, 
        {method: 'GET', 
        headers: {
            'Content-type': 'application/json',
        }})
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
    };
// ?from=0&size=20&tags=under_30_minutes%20chiken'
    function addHandler(e) {
        e.preventDefault()
        dispatch(addCard(KeywordResults))
    }


    return (
        <Box>
            <TextField id="outlined-basic" inputRef={fieldValue}/>
            <Button onClick={handleSubmit}>Submit</Button>
            {/* {!keywordResult ? null :  */}
            <>
                {/* <Typography variant='h5'>
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
                } */}
                <Button onClick={addHandler}>Add to my Recipes</Button>   
            </>
            {/* } */}
        </Box>
    );
}

export default APIAddForm;