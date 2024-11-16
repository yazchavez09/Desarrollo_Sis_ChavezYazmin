const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');
const Productos = require('./SQL_Productos');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto: {
        type: DataTypes.STRING(30),
        references: {
            model: Productos,
            key: 'id'
        }
    },
    monto_final: {
        type: DataTypes.FLOAT,
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
