const axios = require('axios');
const { Pokemon } = require('../db');

const checkPokemonName = async (req, res) => {

  const { name } = req.params;
  try {
      // Buscar en la API externa
      const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (apiResponse.status === 200) {
          return res.status(200).json({ message: 'El Pokémon ya existe en la API externa' });
      }
  } catch (error) {
      // Si no lo encuentra en la API externa, buscar en la base de datos
      const pokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() } });
      if (pokemon) {
          return res.status(200).json({ message: 'El Pokémon ya existe en la base de datos' });
      } else {
          return res.status(200).json({ message: 'El nombre del Pokémon está disponible' });
      }
  }
}

module.exports = checkPokemonName;
