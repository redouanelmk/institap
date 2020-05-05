const initialState= {
    favoriteFilm: []
}

function toggleFavorite (state = initialState, action){
    let nextState
    switch (action.type){
        case 'TOOGLE_FAVORITE':
            const favoriteFilmIdex = state.favoriteFilm.findIndex(item.id === action.value.id) -1
            if (favoriteFilmIdex !== -1){
                // suppression
                nextState = {
                    ...state,
                    favoriteFilm : state.favoriteFilm.filter((item, index) => index ==! favoriteFilmIdex)
                }
            }
            else {
                nextState = {
                    ...state,
                    favoriteFilm: [ ...state.favoriteFilm, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}
export default toggleFavorite