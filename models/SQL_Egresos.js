const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Proveedores = require('./SQL_Proveedores');

const Egresos = sequelize.define('Egresos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  servicio: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  dni_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proveedores,
      key: 'dni'
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