const express = require('express');
const router = express.Router();

const Producto = require('../models/SQL_Productos');

router.post('/agregar', agregarProducto);
router.get('/mostrar', mostrarProductos);
router.get('/buscarPorNombre', buscarProductos);

async function agregarProducto(req, res) {

    try {

        const json = req.body;

        req.isAdmin = true;
        if (!req.isAdmin || !req.isEmpleado)
            res.status(401).send('No autorizado');


        if (!json || !json.precioVenta || !json.precioCompra || !json.comercializable) 
            return res.status(404).json({ msg: "Faltan datos del producto" });

        const resulProducto = await Productos.create(json);

        if (!resulProducto)
            res.status(404).json({ msg: "no se pudo crear producto" })

        res.status(201).json(resulProducto.id_prod);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }

    
}

function mostrarProductos(req, res) {

    try {
        req.isAdmin = true;
        if (!req.isAdmin || !req.isEmpleado) {
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

function buscarProductos(req, res) {

    try {

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        const producto = Productos.findAll({where:{nombre}})

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