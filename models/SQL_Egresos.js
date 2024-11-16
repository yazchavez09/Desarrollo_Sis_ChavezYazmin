const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

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
  proveedor: {
    type: DataTypes.STRING(30),
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
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