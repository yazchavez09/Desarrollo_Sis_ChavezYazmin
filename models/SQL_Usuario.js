const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');
const Rol = require('./Rol');
const Persona = require('./Persona');

const Usuario = sequelize.define('Usuario', {
  id: {
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
  rol: {
    type: DataTypes.INTEGER,
	references: {
      model: Rol,
      key: 'id'
    }
  },
  dni: {
    type: DataTypes.INTEGER,
	references: {
	  model: Persona,
	  key: 'dni'
	}
	}
}, {
  tableName: 'usuario',
  timestamps: true
});

module.exports = Usuario;