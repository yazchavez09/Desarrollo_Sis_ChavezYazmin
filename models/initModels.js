// models/initModels.js
const Rol = require('../models/SQL_Rol');
const Persona = require('../models/SQL_Persona');
const Usuario = require('../models/SQL_Usuario');
const Cliente = require('../models/SQL_Clientes');
const Producto = require('../models/SQL_Productos');
const Facturacion = require('../models/SQL_Facturacion');
const Carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');
const Proveedores = require('../SQL_Proveedores');
const Egresos = require('../SQL_Egresos');


const initModels = () => {
    // Relación entre Usuario y Rol
    Rol.hasOne(Usuario);
    Usuario.belongsTo(Rol);

    // Relación entre Persona y Usuario
    Persona.hasOne(Usuario);
    Usuario.belongsTo(Persona);

    Persona.hasOne(Cliente);
    Cliente.belongsTo(Persona);

    Producto.hasMany(Item_carrito);
    Item_carrito.belongsTo(Producto);

    Carrito.hasMany(Item_carrito);
    Item_carrito.belongsTo(Carrito);

    Facturacion.hasMany(Carrito);
    Carrito.belongsTo(Facturacion);

    Proveedores.hasMany(Egresos);
    Egresos.belongsTo(Proveedores);
    
};

// Llama a la función de inicialización para definir las relaciones
initModels();

// Exporta la función de inicialización para ser utilizada en otros archivos si es necesario
module.exports = initModels;