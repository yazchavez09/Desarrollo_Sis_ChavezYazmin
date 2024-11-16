const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Proveedores = sequelize.define('Proveedores', {
  dni: {
    type: DataTypes.INTEGER,
    primaryKey: true,
	validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
	
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
	
  },
  direccion: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  descripcion: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isEmail: true,
	  notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  telefono: {
    type: DataTypes.STRING(30),
    allowNull: true
  }
}, {
  tableName: 'proveedores',
  timestamps: true
});

module.exports = Proveedores;