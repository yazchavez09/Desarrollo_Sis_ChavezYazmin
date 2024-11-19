const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Rol = sequelize.define('Rol', {
  id_rol: {

    type: DataTypes.INTEGER,  
    autoIncrement:true,
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
