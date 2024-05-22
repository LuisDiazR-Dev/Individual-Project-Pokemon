const { Pokemon, Type } = require('../db');

const createPokemonDB = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

  try {
    // Crear el nuevo Pokémon
    const newPokemon = await Pokemon.create({ 
      name, 
      image, 
      hp, 
      attack, 
      defense, 
      speed, 
      height, 
      weight 
    });

    // Encontrar o crear los tipos y asociarlos con el nuevo Pokémon
    if (types && types.length > 0) {
      const typePromises = types.map(type => Type.findOrCreate({ where: { name: type } }));
      const typeInstances = await Promise.all(typePromises);
      await newPokemon.addTypes(typeInstances.map(typeInstance => typeInstance[0]));
    }

    // Obtener el Pokémon con sus tipos asociados para devolverlo en la respuesta
    const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, {
      include: Type,
    });

    res.status(201).json(pokemonWithTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPokemonDB;