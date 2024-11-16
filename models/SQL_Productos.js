const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = sequelize.define('Productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  precio_venta: {
    type: DataTypes.FLOAT,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  precio_compra: {
    type: DataTypes.FLOAT,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  },
  comercializable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
	allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  }
}, {
  tableName: 'productos',
  timestamps: true
});

await sequelize.quyery("ALTER TABLE Productos AUTO_INCREMENT = 1000");
module.exports = Productos;