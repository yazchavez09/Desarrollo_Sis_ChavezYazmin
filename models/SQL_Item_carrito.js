const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = require('../models/SQL_Productos');
const Carrito = require('../models/SQL_Carrito');

const Item_carrito = sequelize.define('Item_carrito', {
  id_Item_carrito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Productos,
      key: 'id_producto'
    }
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrito,
      key: 'id_carrito'
    }
  },
  cant_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  }
}, {
  tableName: 'Item_carrito',
  timestamps: true
});

module.exports = Item_carrito;
