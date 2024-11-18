const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = require('./SQL_Productos');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Productos,
            key: 'id'
        }
    },
    precioTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La casilla no puede estar vacía'
            }
        }
    }
}, {
    tableName: 'carrito',
    timestamps: true
});

module.exports = Carrito;
