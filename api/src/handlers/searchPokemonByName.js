const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

const searchPokemonByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    // Buscar en la base de datos
    const pokemonsFromDB = await Pokemon.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });
    const pokemonsWithTypes = pokemonsFromDB.map(pokemon => ({
      ...pokemon.toJSON(),
      types: pokemon.Types.map(type => type.name),
    }));

    // Buscar en la API
    let pokemonFromAPI = null;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      pokemonFromAPI = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        types: response.data.types.map((typeInfo) => typeInfo.type.name),
      };
    } catch (apiError) {
      console.log('No Pokémon found in API with the given name');
    }

    const allPokemons = pokemonFromAPI ? [...pokemonsWithTypes, pokemonFromAPI] : [...pokemonsWithTypes];

    if (allPokemons.length > 0) {
      res.json(allPokemons);
    } else {
      res.status(404).json({ message: 'No Pokémon found with the given name' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching Pokémon: ${error.message}` });
  }
};

module.exports = searchPokemonByName;
