const ApiGetAllPokemon = require('../controllers/ApiGetAllPokemon');
const DBgetAllPokemon = require('../controllers/DBgetAllPokemon');

const allPokemons = async (req, res) => {
  try {
    const apiPokemons = await ApiGetAllPokemon();
    const dbPokemons = await DBgetAllPokemon();

    const allPokemons = [...apiPokemons, ...dbPokemons];

    res.status(200).json(allPokemons);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener todos los Pokémon: ${error.message}` });
  }
};

module.exports = allPokemons;