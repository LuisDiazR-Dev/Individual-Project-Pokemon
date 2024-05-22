const axios = require('axios')

const getPokemonDetails = async (url) => {
	try {
			const response = await axios.get(url)
			const data = response.data
			return {
					src: "API",
					id: data.id,
					name: data.name,
					image: data.sprites.other.dream_world.front_default,
					hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
					attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
					defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
					speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
					height: data.height,
					weight: data.weight,
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
			
			// const validPokemonDetails = pokemonDetails.filter(details => details !== null);
			// res.status(200).json(validPokemonDetails);
	} catch (error) {
		console.error(`Error al obtener la lista de Pokémon: ${error.message}`);
		throw new Error('Error al obtener la lista de Pokémon');
	}
};

module.exports = ApiGetAllPokemon

























// const ApiGetAllPokemon2 = async (request, response)=>{

// 	// const { offset = 0, limit = 20 } = req.query;
// 	// const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

// 	const URL = 'https://pokeapi.co/api/v2/pokemon'

// 	try {
// 		const result = await axios.get(`${URL}`)

// 		const pokemonList = result.data.results.name



// 		console.log(pokemonList)


// 		response.status(200).json(pokemonList)

// 	} catch (error) {
// 		response.status(500).json(`Sin datos en la PokeDex. Error: ${error.message}`);		
// 	}
// }