const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
	sequelize.define('Type',{
		id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    }, 
    name: {
      type: DataTypes.STRING, // Tipo STRING para el nombre del temperamento
      allowNull: false, // Hacer que el nombre del temperamento sea obligatorio
    }
	})
};