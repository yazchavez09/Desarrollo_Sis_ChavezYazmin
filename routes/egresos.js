const express = require('express');
const router = express.Router();

const Egresos = require('../models/SQL_Egresos');
const Proveedores = require('../models/SQL_Proveedores');

// Rutas
router.post('/agregar', agregarEgreso);
router.get('/mostrar', mostrarEgresos);
router.get('/mostrar/:vencimiento', mostrarEgresosFecha);
router.put('/modificar/:id', modificarEgreso);

// Función para agregar un egreso
async function agregarEgreso(req, res) {
    try {
        const { servicio, dni_proveedor, vencimiento, pago, monto } = req.body;

        // Validar la existencia del proveedor
        const proveedorExistente = await Proveedores.findByPk(dni_proveedor);

        if (!proveedorExistente) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        const nuevoEgreso = await Egresos.create({ 
            servicio, dni_proveedor, vencimiento, pago, monto
        });

        res.status(201).json();
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

// Función para mostrar todos los egresos
async function mostrarEgresos(req, res) {

    try {

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        const egresos = await Egresos.findAll();

        if(!egresos)
            return res.status(404).json({msg:"No se encontraron egresos"})

        res.status(200).json(egresos);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor'});
    }
}

// Función para mostrar egresos por fecha de vencimiento
async function mostrarEgresosFecha(req, res) {

    try {

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        const { vencimiento } = req.params;

        const egresos = await Egresos.findAll({ where: { vencimiento } });

        if (!egresos) {
            return res.status(404).json({ msg: "No se encontraron egresos con esa fecha" });
        }

        res.status(200).json(egresos);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

// Función para modificar un egreso
async function modificarEgreso(req, res) {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const egreso = await Egresos.findByPk(id);

        if (!egreso) {
            return res.status(404).json({ msg: "Egreso no encontrado" });
        }

        await egreso.update(datosActualizados);

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

module.exports = router;

