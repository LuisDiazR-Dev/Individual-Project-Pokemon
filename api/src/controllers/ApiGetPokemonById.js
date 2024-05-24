const axios = require('axios');
const { Pokemon, Type } = require('../db');

// Función para obtener los detalles del Pokémon desde la API
const getPokemonDetailsFromAPI = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;
    return {
      src: false, // false indicating that it is from the API
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
    };
  } catch (error) {
    console.error(`Error. No hay pokemon con el ${id}: ${error.message}`);
    return null;
  }
};



// Manejador para obtener los detalles del Pokémon por ID
const getPokemonById = async (req, res) => {
  const { id } = req.params;
	const source = isNaN(id) ? "DB" : "API"

  try {
    if (source === 'DB') {
      // Buscar en la base de datos
      const pokemonFromDB = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: { attributes: [] },
        },
      });

      if (pokemonFromDB) {
        return res.json({
          src: true, // true indicating that it is from the DB
          id: pokemonFromDB.id,
          name: pokemonFromDB.name,
          image: pokemonFromDB.image,
          hp: pokemonFromDB.hp,
          attack: pokemonFromDB.attack,
          defense: pokemonFromDB.defense,
          speed: pokemonFromDB.speed,
          height: pokemonFromDB.height,
          weight: pokemonFromDB.weight,
          types: pokemonFromDB.Types.map(type => type.name),
        });
      }
    } else {
      // Buscar en la API si el ID no es un UUID
      const pokemonFromAPI = await getPokemonDetailsFromAPI(id);
      if (pokemonFromAPI) {
        return res.json(pokemonFromAPI);
      }
    }

    // Si no se encuentra en ninguna fuente
    res.status(404).json({ message: 'Pokémon no encontrado' });
  } catch (error) {
    res.status(500).json({ message: `Error al obtener el Pokémon con ID ${id}: ${error.message}` });
  }
};

module.exports = getPokemonById;
