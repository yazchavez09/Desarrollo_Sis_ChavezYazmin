const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Rol = sequelize.define('Rol', {
  id_rol: {
    type: DataTypes.INTEGER,  // Cambiado de INTERGER a INTEGER
    primaryKey: true,
    allowNull: false
  },
  
  tipo: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
  
}, {
  tableName: 'Rol',
  timestamps: false
});

module.exports = Rol;
