const { Pokemon, Type } = require('../db');

const DBgetAllPokemon = async () => {
  try {
    const pokemonsDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    return pokemonsDB.map(pokemon => ({
      ...pokemon.toJSON(),
      types: pokemon.Types.map(type => type.name),
    }));
  } catch (error) {
    console.error(`Error al obtener Pokémon de la base de datos: ${error.message}`);
    throw new Error('Error al obtener Pokémon de la base de datos');
  }
};

module.exports = DBgetAllPokemon;
