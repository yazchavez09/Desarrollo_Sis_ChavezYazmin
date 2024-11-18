const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = sequelize.define('Productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  precio_venta: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  precio_compra: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  },
  comercializable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La casilla no puede estar vacía'
      }
    }
  }
}, {
  tableName: 'productos',
  timestamps: true
});

await sequelize.query("ALTER TABLE Productos AUTO_INCREMENT = 1000");
module.exports = Productos;