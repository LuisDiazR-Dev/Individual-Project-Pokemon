const initialState = {
  pokemonList: [],
  types: [],
  searchedPokemon: [],
  validationMessage: '',
  error: ''
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
    case 'VALIDATE_NAME_SUCCESS':
      return {
        ...state,
        validationMessage: action.payload,
        error: '' 
      }

    case 'VALIDATE_NAME_FAILURE':
      return {
        ...state,
        validationMessage: '',
        error: action.payload
      }

    case 'CLEAR_MESSAGE':
        return {
          ...state,
         validationMessage: '', // Reiniciar el estado de searchedPokemon
        }
      
    default:
      return state
  }
}

export default reducer
