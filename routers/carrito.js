const express = require('express');
const router = express.Router();

const Carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');

router.post('/agregar', agregarCarrito); //http://localhost:3000/carrito/agregar  (Al abrir se crea vacio)
router.put('/modificarTotal/', actualizarCarrito); //calcular precioTotal (no esta hecho)
router.get('/mostrar', mostrarCarrito);//http://localhost:3000/carrito/mostrar

//localhost:2000/DonJuan/stock/mostrarPorId/50


async function agregarCarrito(req, res) { 

    try {
        const carrito = await Carrito.create({
            precioTotal: 0,  // Al principio el carrito no tiene productos, así que el precio total es 0
        });

        res.status(201).json({ id_carrito: carrito.id_carrito });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function actualizarCarrito(req, res) {
    try {
        const { id_carrito } = req.body; // El id_carrito viene en el body

        // Obtener todos los productos asociados al carrito (ajustar según tu modelo)
        const itemsCarrito = await Item_carrito.findAll({
            where: { id_carrito: id_carrito },
            include: [
                {
                    model: Producto, // Incluir los detalles del producto (suponiendo que tienes una relación con Producto)
                    attributes: ['precio_venta'] // Obtener solo el precio de venta
                }
            ]
        });

        // Verificamos si el carrito tiene productos
        if (itemsCarrito.length === 0) {
            return res.status(404).json({ msg: "El carrito está vacío" });
        }

        // Calcular el precio total sumando el precio de cada producto * cantidad
        let precioTotal = 0;
        for (let item of itemsCarrito) {
            console.log("Producto:", item.id_producto); // Log para verificar el producto
            console.log("Precio de venta:", item.Producto.precio_venta); // Log para verificar el precio
            console.log("Cantidad:", item.cant_producto); // Log para verificar la cantidad

            // Verificamos que los valores de `precio_venta` y `cant_producto` sean válidos
            if (!item.Producto.precio_venta || !item.cant_producto) {
                return res.status(400).json({ msg: "Datos incompletos para calcular el total" });
            }

            precioTotal += item.Producto.precio_venta * item.cant_producto; // Sumar al precio total
        }

        // Ahora actualizamos el carrito con el precio total calculado
        const carrito = await Carrito.findByPk(id_carrito);
        if (!carrito) {
            return res.status(404).json({ msg: "Carrito no encontrado" });
        }

        carrito.precioTotal = precioTotal; // Actualizamos el precio total
        await carrito.save(); // Guardamos el cambio en la base de datos

        res.status(200).json({ msg: "Precio total actualizado", precioTotal: carrito.precioTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor', error });
    }
}




async function mostrarCarrito(req, res) {

    try {
        const carritos = await Carrito.findAll();

        if (!carritos.length) {
            return res.status(404).json({ msg: "No hay carritos disponibles" });
        }

        res.status(200).json(carritos);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

module.exports = router;