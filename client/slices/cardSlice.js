const { createSlice } = require('@reduxjs/toolkit');

const cardSlice = createSlice({
  name: 'card',

  initialState: {
    recipes: [],
  },

    reducers: {
        init: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.recipes = [...state.recipes, ...payload];
        },
        addCard: (state, param) => {
            const { payload } = param;
            state.recipes = [...state.recipes, payload]
        }
    }
})

const { actions, reducer } = cardSlice;
export const { init, addCard } = actions;
export default reducer