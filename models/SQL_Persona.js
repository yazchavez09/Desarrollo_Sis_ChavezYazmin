const { DataTypes } = require('sequelize');
const sequelize = require('./SQL_config');

const Persona = sequelize.define('Persona', {
    dni: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            notEmpty: {
                msg: 'La casilla no puede estar vacía'
            }
        }
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
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La casilla no puede estar vacía'
            }
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'El correo debe ser valido',
            },
            notEmpty: {
                msg: 'La casilla no puede estar vacía'
            }
        }        
    },
    enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La casilla no puede estar vacía'
            }
        }
    }    
}, {
    tableName: 'persona',
    timestamps: true
});

module.exports = Persona;