const express = require('express');
const router = express.Router();
const { Productos } = require('../models');

router.post('/agregar', agregarProducto);
router.get('/mostrar', mostrarProductos);

async function agregarProducto(req, res) {

    try {

    const json = req.body;

    if( !req.isAdmin || !req.isEmpleado ) {
        res.status(401).send('No autorizado');
    }

    if (!json || !json.id_prod || !json.precioVenta || !json.precioCompra || !json.comercializable) {
        return res.status(404).json({ msg: "Faltan datos para insertar el producto" });
    }
        const resultado = await Productos.create(json);

        res.status(201).json({ ID: resultado.id_prod });

    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

function mostrarProductos(req, res) {

    try {

        if( !req.isAdmin || !req.isEmpleado ) {
            res.status(401).send('No autorizado');
        }

        const producto = Productos.findAll()

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

module.exports = router;