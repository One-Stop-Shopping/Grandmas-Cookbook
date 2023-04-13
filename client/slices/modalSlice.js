const { createSlice } = require('@reduxjs/toolkit');
const React = require('react')

const modalSlice = createSlice({
    name: 'modal',

    initialState: {
        urlScrape: {},
        keywordScrape: [],
    },

    reducers: {
        setUrlResult: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.urlScrape = Object.assign(payload, state.urlScrape);
        },
        setKeywordResult: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.keywordScrape = [...state, payload]
        }
    }
})

const { actions, reducer } = modalSlice;
export const { setKeywordResult, setUrlResult } = actions;
export default reducer