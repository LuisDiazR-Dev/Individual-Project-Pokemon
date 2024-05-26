const axios = require('axios');
const { Type } = require('../db');

const getTypes = async (req, res, next) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const typesFromApi = response.data.results;

    const typesInDb = await Type.findAll();
    const typesInDbNames = typesInDb.map(type => type.name);

    // Filtrar--Nuevo arreglo con los---------------diferentes v
    const newTypes = typesFromApi.filter(type => !typesInDbNames.includes(type.name));

    // Guardar los nuevos tipos en la base de datos
    const typePromises = newTypes.map(type => {
      return Type.create({ name: type.name });
    });
    await Promise.all(typePromises);

    // Obtener todos los tipos (incluyendo los nuevos) desde la base de datos
    const allTypes = await Type.findAll();

    // Enviar todos los tipos al frontend
    res.json(allTypes);
  } catch (error) {
    next(error);
  }
};

module.exports = getTypes;
