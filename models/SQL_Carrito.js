const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Productos = require('../models/SQL_Productos');

const Carrito = sequelize.define('Carrito', {
    id_carrito: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true

    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Productos,
            key: 'id_producto'
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
