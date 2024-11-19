const express = require('express');
const router = express.Router();

const Proveedores = require('../models/SQL_Proveedores'); // Asegúrate de que este modelo esté definido correctamente

// Rutas
router.post('/agregar', agregarProveedor);
router.get('/mostrar', mostrarProveedores);
router.get('/buscar', buscarProveedor);
router.put('/modificar/:dni', modificarProveedor);
router.put('/deshabilitar/:dni', deshabilitarProveedor);

// Función para agregar un proveedor
async function agregarProveedor(req, res) {//cuit?

    const { dni_proveedor, nombre_proveedor, direccion_proveedor, descripcion, correo, telefono_proveedor } = req.body;

    // Validación de datos de entrada
    if (!dni_proveedor || !nombre_proveedor || !direccion_proveedor || !correo || !telefono_proveedor) {
        return res.status(404).json({ msg: "Faltan datos para insertar el proveedor" });
    }

    try {
        const nuevoProveedor = await Proveedores.create({ dni, nombre, direccion, descripcion, correo, telefono });

        res.status(201).json({ msg: "Proveedor agregado exitosamente", proveedor: nuevoProveedor });

    } catch (error) {
        console.error('Error al agregar proveedor:', error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para mostrar todos los proveedores
async function mostrarProveedores(req, res) {
    try {

        const proveedores = await Proveedores.findAll();

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

        if (!proveedores) {
            return res.status(404).json({ msg: "No se encontraron proveedores" });
        }
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para buscar proveedores por nombre y apellido
async function buscarProveedor(req, res) {
    try {
        req.isAdmin = true;
        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }
        const { nombre_proveedor } = req.query;

        // Validar que se hayan pasado los parámetros de búsqueda
        if (!nombre || !apellido) {
            return res.status(400).json({ msg: "Debe proporcionar nombre y apellido para la búsqueda" });
        }

        // Buscar proveedores que coincidan con el nombre y apellido proporcionados
        const proveedores = await Proveedores.findAll({
            where: {
                nombre_proveedor,
            }
        });

        if (!proveedores) {
            return res.status(404).json({ msg: "No se encontraron proveedores con ese nombre y apellido" });
        }

        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor'});
    }
}

// Función para modificar un proveedor por DNI
async function modificarProveedor(req, res) {

    try {
        req.isAdmin = true;

        if (!req.isAdmin) 
            res.status(401).send('No autorizado');
        
        const dni = req.params;

        const { nombre, direccion, descripcion, correo, telefono } = req.body;

        const proveedor = await Proveedores.findByPk(dni);

        if (!proveedor) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Actualizar los campos del proveedor
        await proveedor.update({
            nombre: nombre || proveedor.nombre,
            direccion: direccion || proveedor.direccion,
            descripcion: descripcion || proveedor.descripcion,
            correo: correo || proveedor.correo,
            telefono: telefono || proveedor.telefono
        });

        res.status(200).json({ msg: "Proveedor actualizado exitosamente", proveedor });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para deshabilitar un proveedor
async function deshabilitarProveedor(req, res) {
    try {
        req.isAdmin = true;

        if (!req.isAdmin) 
            res.status(401).send('No autorizado');

        const dni = req.params;

        // Buscar el proveedor por su DNI
        const proveedor = await Proveedores.findByPk(dni);

        if (!proveedor) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Actualizar el campo `habilitado` a `false`
        await proveedor.update({ habilitado: false });

        res.status(200).json({ msg: "Proveedor deshabilitado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

module.exports = router;