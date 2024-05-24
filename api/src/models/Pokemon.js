const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    src: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true // true indicating that it is from the DB
    },
    id: {
      primaryKey: true,
      type: DataTypes.UUID, // Tipo UUID para un identificador único
      defaultValue: DataTypes.UUIDV4, // Valor por defecto que será un UUID generado automáticamente
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // STRING para la URL de la imagen
      defaultValue: 'https://raw.githubusercontent.com/LuisDiazR-Dev/Individual-Project-Pokemon/main/pokemon.png',
      validate: {
        isUrl: true, // Validación para asegurarse de que sea una URL
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
};
