const initialState = {
  pokemonList: [],
  // types: ['Tipo A', 'Tipo B', 'Tipo C'],
  types: [],
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
      case 'GET_TYPES':
      return {
        ...state,
        types: action.payload
      }
    default:
      return state
  }
}

export default reducer
