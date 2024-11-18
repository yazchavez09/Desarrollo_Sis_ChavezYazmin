const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Persona = require('../models/SQL_Persona');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dni_persona: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: 'dni'
    }
  }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;