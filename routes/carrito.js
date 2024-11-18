const express = require('express');
const router = express.Router();

const Carrito = require('../models/SQL_Carrito');
const ItemCarrito = require('../models/SQL_Item_carrito');

router.post('/agregar', agregarCarrito);
router.put('/modificarTotal/', actualizarCarrito); //calcular precioTotal (no esta hecho)
router.get('/mostrar', mostrarCarrito);

//localhost:2000/DonJuan/stock/mostrarPorId/50


async function agregarCarrito(req, res) { 

    const json = req.body;

    if (!json) {

        return res.status(404).json({ msg: "Faltan datos para insertar en el carrito" });
    }

    try {

        const carrito = await Carrito.create(json);

        if (!carrito)
        res.status(404).json({ msg: "no se pudo crear carrito" })

        res.status(201).json({ ID: result.Id_carrito });
    } catch (error) {
        
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function actualizarCarrito(req,res){

    try {

        const carrito = await Carrito.findAll();

        // Verifica si se encontraron elementos en el carrito
        if (!carrito) {

            return res.status(404).json({ msg: "No se encontraron elementos en el carrito" });
        }
        // Muestra los datos del carrito
        res.status(200).json(carrito);

    } catch (error) {
        // Maneja cualquier error que ocurra durante la consulta
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

async function mostrarCarrito(req, res) {

    try {

        const carrito = await Carrito.findAll();

        // Verifica si se encontraron elementos en el carrito
        if (!carrito) {

            return res.status(404).json({ msg: "No se encontraron elementos en el carrito" });
        }
        // Muestra los datos del carrito
        res.status(200).json(carrito);

    } catch (error) {
        // Maneja cualquier error que ocurra durante la consulta
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

module.exports = router;