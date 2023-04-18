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
            const tempState = state;
            // fetch('/recipe/add', 
            //     {method: 'POST', 
            //     body: JSON.stringify(payload),
            //     headers: {
            //         'Content-type': 'application/json',
            //     }})
            //     .then(res => res.json())
            //     .then(data => console.log(data));
            tempState.recipes = [...state.recipes, payload]
        },
        updateCard: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.recipes = tempState.recipes.map((recipe) => {
                if (recipe.id === payload.id) return payload;
                return recipe;
            })
        },
        deleteCard: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.recipes = tempState.recipes.filter((recipe) => recipe.id !== payload.id)
        }
    }
})

const { actions, reducer } = cardSlice;
export const { init, addCard, updateCard, deleteCard } = actions;
export default reducer