const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');
const Proveedores = require('./SQL_Proveedores');
const Producto = require('./SQL_Productos');

const ItemProveedores = sequelize.define('ItemProveedores', {
  
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  dni: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedores,
      key: 'dni'
    }
  },
  id_prod: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  precio_historico: {
    type: DataTypes.FLOAT,
    allowNull: false,
	validate:{
		notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
	}
  }
}, {
  tableName: 'item_proveedores',
  timestamps: false
});

module.exports = ItemProveedores;
