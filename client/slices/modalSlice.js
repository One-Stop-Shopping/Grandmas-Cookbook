import RecipeCard from '../components/recipeCard.jsx'

const { createSlice } = require('@reduxjs/toolkit');
const React = require('react')


const modalSlice = createSlice({
    name: 'modal',

    initialState: {
        urlScrape: {},
        keywordResults: [],
    },

    reducers: {
        setUrlResult: (state, param) => {
            const { payload } = param;
            state.urlScrape = Object.assign(payload, state.urlScrape);
        },
        clearUrlResult: (state) => {
            state.urlScrape = {};
        },
        setKeywordResult: (state, param) => {
            const { payload } = param;
            state.keywordResults = [...state.keywordResults, ...payload]
        },
        clearKeywordResult: (state) => {
            state.keywordResults = [];
        },
    }
})

const { actions, reducer } = modalSlice;
export const { setKeywordResult, setUrlResult, clearKeywordResult, clearUrlResult } = actions;
export default reducer