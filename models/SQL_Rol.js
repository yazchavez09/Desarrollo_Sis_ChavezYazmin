const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  
  tipo:{
	type: DataTypes.STRING(50),
	allowNull: false
  }
  
  
}, {
  tableName: 'Rol',
  timestamps: false
});

module.exports = Rol;