// models/initModels.js
const Rol = require('../models/SQL_Rol');
const Persona = require('../models/SQL_Persona');
const Usuario = require('../models/SQL_Usuario');
const Cliente = require('../models/SQL_Clientes');
const Proveedor = require('../models/SQL_Proveedores');
const Egresos = require('../models/SQL_Egresos');
const Producto = require('../models/SQL_Productos');
const Facturacion = require('../models/SQL_Facturacion');
const Carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');


const initModels = () => {
    Rol.hasOne(Usuario);
    Usuario.belongsTo(Rol);

    Persona.hasOne(Cliente);
    Cliente.belongsTo(Persona);

    Persona.hasOne(Usuario);
    Usuario.belongsTo(Persona);

    Usuario.hasOne(Rol);
    Rol.belongsTo(Usuario);

    Producto.hasMany(Item_carrito);
    Item_carrito.belongsTo(Producto);

    Carrito.hasMany(Item_carrito);
    Item_carrito.belongsTo(Carrito);

    Facturacion.hasMany(Carrito);
    Carrito.belongsTo(Facturacion);

    //aca error de foreyKey 
    Proveedor.hasMany(Egresos, {
        foreignKey: 'dni_proveedor',
        sourceKey: 'dni_proveedor',
    });
    Egresos.belongsTo(Proveedor, {
        foreignKey: 'dni_proveedor',
        targetKey: 'dni_proveedor',
    });
};

// Llama a la función de inicialización para definir las relaciones
initModels();

// Exporta la función de inicialización para ser utilizada en otros archivos si es necesario
module.exports = initModels;