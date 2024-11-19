const express = require('express');
const router = express.Router();

const Productos = require('../models/SQL_Productos');

router.post('/agregar', agregarProducto);
router.get('/mostrar', mostrarProductos);//comercializable = true
router.get('/buscarPorNombre', buscarProductos);
router.put('/modificar/:id', modificarProducto);
router.put('/deshabilitar/:id', deshabilitarProducto);

async function agregarProducto(req, res) {

    try {
        const json = { ...req.body, comercializable: true };

        if (!json||!json.precioVenta || !json.precioCompra) {
            return res.status(404).json({ msg: "Faltan datos del producto" });
        }
        const resulProducto = await Productos.create(json);

        if (!resulProducto)
            res.status(404).json({ msg: "no se pudo crear producto" })

        res.status(201).json(resulProducto);
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}


async function mostrarProductos(req, res) {

    try {
        req.isAdmin = true;

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        const productos = await Productos.findAll({ where: { comercializable: true } });

        if (!productos) {

            return res.status(404).json({ msg: "No se encontraron productos" });
        }

        // Envía la respuesta con los datos del producto

        res.status(200).json(productos);

    } catch (error) {

        // Maneja cualquier error que ocurra durante la consulta

        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function buscarProductos(req, res) {

    try {

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        const producto = Productos.findAll({where:{nombre_producto}})

        if (!producto) {

            return res.status(404).json({ msg: "No se encontraron productos" });
        }

        // Envía la respuesta con los datos del producto

        res.status(200).json(producto);

    } catch (error) {

        // Maneja cualquier error que ocurra durante la consulta

        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function modificarProducto(req, res) {

try {

    if (!req.isAdmin) {
            
        res.status(401).send('No autorizado');
    }

    const id_producto = req.params;

    const { nombre_producto, precioVenta, precioCompra } = req.body;

        const producto = await Productos.findByPk(dni);



        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        // Actualizar los campos del proveedor
        await producto.update({
            nombre_producto: nombre_producto || producto.nombre_producto,
            precioCompra: precioCompra || producto.precioCompra,
            precioVenta: precioVenta || producto.precioVenta
        });

        res.status(200).json({ msg: "Proveedor actualizado exitosamente", proveedor });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }

}

// Función para deshabilitar un producto
async function deshabilitarProducto(req, res) {
    try {
        const id_producto  = req.params;

        // Buscar el proveedor por su DNI
        const producto = await Productos.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Actualizar el campo `comercializable` a `false`
        await producto.update({ comercializable: false });

        res.status(200).json({ msg: "Producto deshabilitado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

module.exports = router;