const { DataTypes } = require('sequelize');
const sequelize = require('../models/SQL_config');

const Rol = require('../models/SQL_Rol');
const Persona = require('../models/SQL_Persona');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre no puede estar vacío'
      }
    }
  },
  contrasenia: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La contraseña no puede estar vacía'
      }
    }
  },
  id_rol: {
    type: DataTypes.INTEGER,
	references: {
      model: Rol,
      key: 'id_rol'
    }
  },
  dni_persona: {
    type: DataTypes.INTEGER,
	references: {
	  model: Persona,
	  key: 'dni_persona'
	}
	}
}, {
  tableName: 'usuario',
  timestamps: true
});

module.exports = Usuario;