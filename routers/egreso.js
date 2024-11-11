const express = require('express');
const router = express.Router();
const { Egresos } = require('../SQL_Egresos'); //proveedor

// Rutas
router.post('/agregar', agregarEgreso);
router.get('/mostrar', mostrarEgresos);
router.get('/mostrar/:vencimiento', mostrarEgresosFecha); //fecha
router.put('/modificar/:id', modificarEgreso);

// Función para agregar un egreso
async function agregarEgreso(req, res) {
    const { servicio, proveedor, vencimiento, pago, monto_E } = req.body;

    // Validación de datos de entrada
    if (!servicio || !proveedor || !vencimiento || monto_E == null) {
        return res.status(400).json({ msg: "Faltan datos para insertar el egreso" });
    }

    try {
        //pago
        const nuevoEgreso = await Egresos.create({ servicio, proveedor, vencimiento, pago, monto_E});

        res.status(201).json({ msg: "Egreso agregado exitosamente", egreso: nuevoEgreso });
        
    } catch (error) {

        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para mostrar todos los egresos
async function mostrarEgresos(req, res) {
    try {
        const egresos = await Egresos.findAll();
        if (!egresos.length) {
            return res.status(404).json({ msg: "No se encontraron egresos" });
        }
        res.status(200).json(egresos);
    } catch (error) {

        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para mostrar todos los egresos
async function mostrarEgresosFecha(req, res) {

    try {

        const egresos = await Egresos.findAll();//fecha

        if (!egresos) { //fecha

            return res.status(404).json({ msg: "No se encontraron egresos" });
        }
        res.status(200).json(egresos);

    } catch (error) {

        res.status(500).json({ msg: 'Error del servidor' });
    }
}


module.exports = router;
