// models/initModels.js
const Rol = require('./SQL_Rol');
const Persona = require('./SQL_Persona');
const Usuario = require('./SQL_Usuario');
const Cliente = require('./SQL_Clientes');
const Proveedor = require('./SQL_Proveedores');
const Egresos = require('./SQL_Egresos');
const Producto = require('./SQL_Productos');
const Facturacion = require('./SQL_Facturacion');
const Carrito = require('./SQL_Carrito');
const Item_carrito = require('./SQL_Item_carrito');

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

    Proveedor.hasMany(Egresos);
    Egresos.belongsTo(Proveedor);
};

// Llama a la función de inicialización para definir las relaciones
initModels();

// Exporta la función de inicialización para ser utilizada en otros archivos si es necesario
module.exports = initModels;