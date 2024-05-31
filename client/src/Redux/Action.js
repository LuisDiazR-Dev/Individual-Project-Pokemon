import axios from 'axios'

// ? ALl
const getAllPokemons = () => {
  const endpoint = 'http://localhost:3001/pokemons'

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      dispatch({
        type: 'GET_POKEMON',
        payload: data,
      })
    } catch (error) {
      console.error('Error cargando Pokemons:', error)
    }
  }
}

// ? Id
const searchPokemonById = (id) => {
  const endpoint = `http://localhost:3001/pokemons/${id}`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      dispatch({
        type: 'SEARCH_POKEMON',
        payload: data,
      })
    } catch (error) {
      console.error('Error buscando Pokemon por ID:', error)
    }
  }
}

// ? name
const searchPokemonByName = (name) => {
  const endpoint = `http://localhost:3001/pokemons/name?name=${name}`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      dispatch({
        type: 'SEARCH_POKEMON_NAME',
        payload: data,
      })
    } catch (error) {
      console.error('Error buscando Pokemon por nombre:', error);
      window.alert(`Error buscando Pokemon por nombre: ${error.message}`);

    }
  }
}

// ? clear Search
const clearSearch = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_SEARCH',
    });
  };
};

// ? types
const getTypes = () => {
  const endpoint = `http://localhost:3001/types`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      dispatch({
        type: 'GET_TYPES',
        payload: data,
      })
    } catch (error) {
      console.error('Error buscando tipos de Pokémon:', error)
      window.alert(`Error buscando tipos de Pokémon: ${error.message}`)
      dispatch({
        type: 'GET_TYPES',
        payload: [],
      })
    }
  }
}

// ? validation exist pokemon
const validatePokemonName = (name) => async (dispatch) => {
  try {
      const response = await axios.get(`http://localhost:3001/check/${name}`);
      dispatch({ type: 'VALIDATE_NAME_SUCCESS', payload: response.data.message });
  } catch (error) {
      dispatch({ type: 'VALIDATE_NAME_FAILURE', payload: error.message });
  }
};

// ? clear validation message
const clearValidationMessage = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    });
  };
};


export { getAllPokemons, searchPokemonById, searchPokemonByName, clearSearch, getTypes, validatePokemonName, clearValidationMessage  }