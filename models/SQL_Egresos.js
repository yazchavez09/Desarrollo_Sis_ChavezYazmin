const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Proveedores = require('../models/SQL_Proveedores');

const Egresos = sequelize.define('Egresos', {
  id_egreso: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  servicio: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },//aca error de foreyKey 
  dni_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedores,
      key: 'dni_proveedor'
    }
  },
  vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  pago: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  }
}, {
  tableName: 'egresos',
  timestamps: true
});

module.exports = Egresos;