// models/initModels.js
const Persona = require('./Persona');
const Cliente = require('./Cliente');
const Proveedor = require('./Proveedor');
const ItemProveedor = require('./Item_proveedor');
//const Productos = require('./Productos');
//const Egresos = require('./Egresos');
const Facturacion = require('./Facturacion');
const Carrito = require('./Carrito');
const Item_carrito = require('./Item_carrito');

Persona.hasOne(Cliente);
Cliente.belongsTo(Persona);

Persona.hasOne(Usuario);
Usuario.belongsTo(Persona);

Usuario.hasOne(Rol);
Rol.belongsTo(Usuario);

Proveedor.hasMany(ItemProveedor);
ItemProveedor.belongsTo(Proveedor);

Producto.hasMany(ItemProveedor);
ItemProveedor.belongsTo(Producto);

Producto.hasMany(Item_carrito);
Item_carrito.belongsTo(Producto);

Carrito.hasMany(Item_carrito);
Item_carrito.belongsTo(Carrito);

Facturacion.hasMany(Carrito);
Carrito.belongsTo(Facturacion);

Proveedor.hasMany(Egreso);
Egreso.belongsTo(Proveedor);



module.exports = initModels;
