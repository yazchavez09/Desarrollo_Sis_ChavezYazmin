const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = require('./SQL_Productos');
const Carrito = require('./SQL_Carrito');

const Item_carrito = sequelize.define('Item_carrito', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Productos,
      key: 'id'
    }
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrito,
      key: 'id'
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
