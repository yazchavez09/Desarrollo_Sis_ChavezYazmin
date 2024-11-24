const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Producto = require('../models/SQL_Productos'); 
const Carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');


//
router.post('/agregar', agregarProducto) //http://localhost:3000/item_carrito/agregar
router.delete('/eliminar', EliminarProducto)

/*
    {
        'id_producto' : 5014,
        'id_carrito' : 2,
        'cant_p' : 3   
    }
*/
async function agregarProducto(req, res) {
    try {
        const { id_carrito, id_producto, cant_producto } = req.body;

        // Verificación de datos faltantes
        if (!id_carrito || !id_producto || !cant_producto) {
            return res.status(400).json({ msg: "Faltan datos para agregar el producto al carrito" });
        }

        // Buscar el producto por su ID
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        // Buscar si el producto ya existe en el carrito
        const itemExistente = await Item_carrito.findOne({
            where: { id_carrito, id_producto }
        });

        let item;
        let subtotal;

        if (itemExistente) {
            // Si el producto ya existe en el carrito, se actualiza la cantidad y el subtotal
            item = itemExistente;
            item.cant_producto += cant_producto;
            subtotal = item.cant_producto * producto.precio_venta;

            // Actualizar el item en la base de datos
            await item.update({ cant_producto: item.cant_producto, subtotal });
        } else {
            // Si el producto no está en el carrito, se crea un nuevo ítem
            subtotal = producto.precio_venta * cant_producto;

            item = await Item_carrito.create({
                id_carrito,
                id_producto,
                cant_producto,
                subtotal
            });
        }

        // Actualizar el precio total del carrito
        const carrito = await Carrito.findByPk(id_carrito);
        if (!carrito) {
            return res.status(404).json({ msg: "Carrito no encontrado" });
        }

        const nuevoPrecioTotal = carrito.precioTotal + subtotal;
        await carrito.update({ precioTotal: nuevoPrecioTotal });

        res.status(201).json({ msg: "Producto agregado al carrito", item, nuevoPrecioTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}



/*
    {
        'id_carrito' : 1,
        'producto' : 304
    }
*/
async function EliminarProducto(req, res) {

    try {
        // Obtener los datos del cuerpo de la solicitud
        const body = req.body;

        // Verificar que se pasaron los datos necesarios
        if (!body.id_carrito || !body.id_producto) {
            return res.status(400).json({ msg: "Faltan datos para eliminar el producto" });
        }

        // Buscar el producto en el carrito
        const producto = await Item_carrito.findOne({
            where: {
                id_carrito: body.id_carrito,
                id_producto: body.id_producto
            }
        });

        // Si no se encuentra el producto en el carrito
        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado en el carrito" });
        }

        // Eliminar el producto del carrito
        await producto.destroy();

        // Respuesta exitosa
        res.status(200).json({ msg: "Producto eliminado del carrito exitosamente" });
    } catch (error) {
        // Manejo de errores del servidor
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }

}

module.exports = router;