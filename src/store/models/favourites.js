
const favourites = {
    state: [],

    reducers: {
        addToFavourites: (state, product) => {
            return [...state, product]
        },
        removeFromFavourites: (state, productId) => {
          return state.filter(prod => prod._id !== productId)  
        },
    }
}

export default favourites;