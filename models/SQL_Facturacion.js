const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Carrito = require('../models/SQL_Carrito');
const Cliente = require('../models/SQL_Clientes');
const Persona = require('../models/SQL_Persona'); // Asegúrate de que tienes el modelo Persona

const Facturacion = sequelize.define('Facturacion', {
  nro_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,  // Asegúrate de tener el modelo Persona definido correctamente
      key: 'id_cliente'
    }
  },
  monto_final: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrito,
      key: 'id_carrito'
    }
  },
  dni_persona: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,  // Asegúrate de tener el modelo Persona definido correctamente
      key: 'dni_persona'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  }
}, {
  tableName: 'facturacion',
  timestamps: true
});

module.exports = Facturacion;
