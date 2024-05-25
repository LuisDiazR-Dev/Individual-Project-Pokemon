const initialState = {
  pokemonList: [],
  types: ['Tipo A', 'Tipo B', 'Tipo C'],
  searchedPokemon: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON':
      return {
        ...state,
        pokemonList: action.payload,
      }
    case 'SEARCH_POKEMON_NAME':
      return {
        ...state,
        searchedPokemon: action.payload,
      }
    case 'CLEAR_SEARCH':
      return {
        ...state,
        searchedPokemon: [], // Reiniciar el estado de searchedPokemon
      }
    default:
      return state
  }
}

export default reducer
