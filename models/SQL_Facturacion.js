const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');
const Carrito = require('./SQL_Carrito');


const Facturacion = sequelize.define('Facturacion', {
  nro_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  apellido: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  monto_fijo: {
    type: DataTypes.FLOAT,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  carrito: {
    type: DataTypes.STRING(30),
    references: {
      model: Carrito,
      key: 'id'
    }
  },
  vendedor: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
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