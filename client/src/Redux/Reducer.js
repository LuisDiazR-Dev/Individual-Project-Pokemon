const initialState = {
  pokemonList: [],
  types: ['Tipo A', 'Tipo B', 'Tipo C'],
  searchedPokemon: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON':
      return {
        ...state,
        pokemonList: action.payload,
      }
    case 'SEARCH_POKEMON':
      return {
        ...state,
        searchedPokemon: action.payload,
      }
    default:
      return state
  }
}

export default reducer
