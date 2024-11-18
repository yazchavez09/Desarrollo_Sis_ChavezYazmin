const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Carrito = require('./SQL_Carrito');
const Persona = require('./SQL_Persona'); // Asegúrate de que tienes el modelo Persona

const Facturacion = sequelize.define('Facturacion', {
  nro_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  apellido: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
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
      key: 'id'
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
