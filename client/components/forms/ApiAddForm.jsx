import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, Backdrop, CircularProgress} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setKeywordResult } from '../../slices/modalSlice';
import { addCard } from '../../slices/cardSlice'
import RecipeCard from '../recipeCard.jsx';

function APIAddForm() {
    const keywordFieldValue = useRef('');
    const tagFieldValue = useRef('');
    const dispatch = useDispatch();
    const { KeywordResults, clearKeywordResult } = useSelector(state=>state.modal)
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        
        const keywords = keywordFieldValue.current.value.split(' ');
        const tags = tagFieldValue.current.value.split(' ');
        
        let tagsQuery;
        let keywordsQuery;

        console.log(tags, keywords)

        if (keywords[0] === '') {
            keywordsQuery = 'null'
            keywords.shift()
        } else {
            keywordsQuery = keywords.shift();
        }
        
        if (tags[0] === '') {
            tagsQuery = 'null'
            tags.shift()
        } else {
            tagsQuery = tags.shift();
        }
        

        while (keywords.length >= 1) {
            keywordsQuery += `%20${  keywords.shift()}`
        }
        
        while (tags.length >= 1) {
            tagsQuery += `%20${  tags.shift()}`
        }

        console.log('tags', tagsQuery, 'keywords', keywordsQuery)

        const query = 'http://localhost:3000/tasty/tagQuery/0/50/' + tagsQuery.toLowerCase() + '/' + keywordsQuery.toLowerCase()

        await fetch(query)
            .then((res) => res.json())
            .then((data) => { console.log(data) })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let { title, ingredientList, directions } = data[i]
                    <RecipeCard 
                        type='APIForm'
                        title= {title}
                        ingredientList= {ingredientList}
                        directions= {directions}
                    /> 
                }
            })
            .then(() => handleClose())
            // .then(() => dispatch(clearKeywordResult()))
    };

    function addHandler(e) {
        e.preventDefault()
        handleOpen();
        fetch('/recipe/add', 
            {method: 'POST', 
            body: JSON.stringify(e),
            headers: {
                'Content-type': 'application/json',
            }})
            .then(res => res.json())
            .then(data => dispatch(addCard(data)))
            .then(() => handleClose())
    }


    return (
        <Box>
            <TextField id="tagsField" label='tags' inputRef={tagFieldValue}/>
            <TextField id="keywordField" label='keywords' inputRef={keywordFieldValue}/>
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

export default APIAddForm;