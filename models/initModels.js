const Rol = require('../models/SQL_Rol');
const Persona = require('../models/SQL_Persona');
const Usuario = require('../models/SQL_Usuario');
const Cliente = require('../models/SQL_Clientes');
const Producto = require('../models/SQL_Productos');
const Facturacion = require('../models/SQL_Facturacion');
const Carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');
const Proveedores = require('../models/SQL_Proveedores');
const Egresos = require('../models/SQL_Egresos');

const initModels = () => {
    // Relación entre Usuario y Rol
    Rol.hasOne(Usuario, { foreignKey: 'id_rol' });
    Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

    // Relación entre Persona y Usuario
    Persona.hasOne(Usuario, { foreignKey: 'dni_persona' });
    Usuario.belongsTo(Persona, { foreignKey: 'dni_persona' });

    // Relación entre Persona y Cliente
    Persona.hasOne(Cliente, { foreignKey: 'dni_cliente' });
    Cliente.belongsTo(Persona, { foreignKey: 'dni_cliente' });

    // Relación entre Producto y Item_carrito
    Producto.hasMany(Item_carrito, { foreignKey: 'id_producto' });
    Item_carrito.belongsTo(Producto, { foreignKey: 'id_producto' });

    // Relación entre Carrito y Item_carrito
    Carrito.hasMany(Item_carrito, { foreignKey: 'id_carrito' });
    Item_carrito.belongsTo(Carrito, { foreignKey: 'id_carrito' });

    // Relación entre Facturación, Cliente y Carrito
    Facturacion.belongsTo(Cliente, { foreignKey: 'id_cliente' });
    Cliente.hasMany(Facturacion, { foreignKey: 'id_cliente' });

    Facturacion.belongsTo(Carrito, { foreignKey: 'id_carrito' });
    Carrito.hasOne(Facturacion, { foreignKey: 'id_carrito' });

    // Relación entre Proveedores y Egresos
    Proveedores.hasMany(Egresos, { foreignKey: 'dni_proveedor' });
    Egresos.belongsTo(Proveedores, { foreignKey: 'dni_proveedor' });
};

// Llama a la función de inicialización para definir las relaciones
initModels();

// Exporta la función de inicialización para ser utilizada en otros archivos si es necesario
module.exports = initModels;