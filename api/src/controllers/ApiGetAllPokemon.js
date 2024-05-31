const axios = require('axios')

const getPokemonDetails = async (url) => {
	try {
			const response = await axios.get(url)
			const data = response.data
			return {
				src:false,
					id: data.id,
					name: data.name,
					image: data.sprites.other.dream_world.front_default,
					attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
					types: data.types.map(typeInfo => typeInfo.type.name),
			}
	} catch (error) {
			console.error(`Error al obtener detalles de ${url}: ${error.message}`);
			return null
	}
};



const ApiGetAllPokemon = async (req, res) => {

	try {
			const result = await axios.get('https://pokeapi.co/api/v2/pokemon')
			// const pokemonList = result.data.results.slice(0, 20); // Obtener solo los primeros 20
			const pokemonList = result.data.results

			// Use Promise.all para solicitudes en paralelo
			const pokemonDetails = await Promise.all(pokemonList.map(pokemon => getPokemonDetails(pokemon.url)))

			// en caso de errores
			return pokemonDetails.filter(details => details !== null)
			
	} catch (error) {

		console.error(`Error al obtener la lista de Pokémon: ${error.message}`);
		// throw new Error('Error al obtener la lista de Pokémon');
		return pokemonList = {}
	}
};

module.exports = ApiGetAllPokemon