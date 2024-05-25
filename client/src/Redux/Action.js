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


export { getAllPokemons, searchPokemonById, searchPokemonByName, clearSearch  }