const express = require('express');
const router = express.Router();

const Proveedores = require('../models/SQL_Proveedores'); 

// Rutas
router.post('/agregar', agregarProveedor); //http://localhost:3000/proveedor/agregar POST BODY raw
router.get('/mostrar', mostrarProveedores);
router.get('/buscar', buscarProveedor);//http://localhost:3000/proveedor/buscar?nombre_proveedor=Juan
router.put('/modificar/:dni_proveedor', modificarProveedor); //http://localhost:3000/proveedor/modificar/3697965
router.delete('/deshabilitar/:dni_proveedor', deshabilitarProveedor); // http://localhost:3000/proveedor/deshabilitar/3697965

// Función para agregar un proveedor
async function agregarProveedor(req, res) {

    try {
        const { dni_proveedor, nombre_proveedor, direccion_proveedor, descripcion, correo, telefono_proveedor } = req.body;

        // Validación de datos de entrada
        if (!dni_proveedor || !nombre_proveedor || !direccion_proveedor || !correo || !telefono_proveedor) {
            return res.status(404).json({ msg: "Faltan datos para insertar el proveedor" });
        }

        const nuevoProveedor = await Proveedores.create({ dni_proveedor, nombre_proveedor, direccion_proveedor, descripcion, correo, telefono_proveedor });

        if (!nuevoProveedor) {
            return res.status(404).json({ msg: "No se pudo crear usuario" });
        }

        res.status(201).json({ msg: "Proveedor agregado exitosamente" });

    } catch (error) {
        console.error('Error al agregar proveedor:', error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}
/*
{
"dni_proveedor":3697965,
"nombre_proveedor":"Juan",
"direccion_proveedor":"Lautaro 1459",
"descripcion":"vende clavos",
"correo":"juan1@gmail.com",
"telefono_proveedor":"yaz09"
}
*/

// Función para mostrar todos los proveedores
async function mostrarProveedores(req, res) {
    try {

        /*
        req.isAdmin = true;
        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }
*/
        const proveedores = await Proveedores.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
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
        /*
        req.isAdmin = true;
        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }
*/

        const nombre_proveedor = req.query;

        // Validar que se hayan pasado los parámetros de búsqueda
        if (!nombre_proveedor) {
            return res.status(400).json({ msg: "Debe proporcionar nombre y apellido para la búsqueda" });
        }

        // Buscar proveedores que coincidan con el nombre y apellido proporcionados
        const proveedores = await Proveedores.findAll({
                nombre_proveedor, attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!proveedores) {
            return res.status(404).json({ msg: "No se encontraron proveedores con ese nombre y apellido" });
        }

        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para modificar un proveedor por DNI
async function modificarProveedor(req, res) {

    try {
        /*
        req.isAdmin = true;

        if (!req.isAdmin)
            res.status(401).send('No autorizado');
        */

        const dni_proveedor = req.params.dni_proveedor;

        const body = req.body;

        const proveedor = await Proveedores.findByPk(dni_proveedor);

        if (!proveedor) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Actualizar los campos del proveedor
        await proveedor.update({
            dni_proveedor: body.dni_proveedor||proveedor.dni_proveedor,
            nombre_proveedor: body.nombre_proveedor || proveedor.nombre_proveedor,
            direccion_proveedor: body.direccion_proveedor || proveedor.direccion_proveedor,
            descripcion: body.descripcion || proveedor.descripcion,
            correo: body.correo || proveedor.correo,
            telefono_proveedor: body.telefono_proveedor || proveedor.telefono_proveedor
        });

        res.status(200).json({ msg: "Proveedor actualizado exitosamente", proveedor });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

// Función para deshabilitar un proveedor
async function deshabilitarProveedor(req, res) {
    try {
        /*
        req.isAdmin = true;
        if (!req.isAdmin)
            res.status(401).send('No autorizado');
        */

        const dni_proveedor = req.params.dni_proveedor;

        const body = req.body;

        // Buscar el proveedor por su dni
        const proveedor = await Proveedores.findByPk(dni_proveedor);

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