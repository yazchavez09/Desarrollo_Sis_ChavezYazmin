// Importa el módulo Express para manejar rutas HTTP
const express = require('express');

const Role = require('../models/SQL_Rol'); // Asegúrate de que este modelo esté bien configurado según tu tabla

// Crea una nueva instancia de Router para definir rutas relacionadas con roles
const router = express.Router();

// Define las rutas para los diferentes métodos HTTP
router.get('/', obtenerRoles); // GET /api/roles
router.get('/:id_rol', obtenerRolPorId); // GET /api/roles/:id_rol
router.post('/', agregarRol); // POST /api/roles
router.put('/:id_rol', actualizarRol); // PUT /api/roles/:id_rol

// Función para obtener todos los roles
async function obtenerRoles(req, res) {
    try {
        const roles = await Role.findAll(); // Trae todos los roles de la tabla
        res.json(roles); // Devuelve los roles en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Función para obtener un rol específico por su id_rol
async function obtenerRolPorId(req, res) {
    try {
        const rol = await Role.findByPk(req.params.id_rol); // Busca un rol por su clave primaria
        if (rol) {
            res.json(rol); // Devuelve el rol encontrado
        } else {
            res.status(404).json({ message: 'Rol no encontrado' }); // Si no existe, devuelve un error 404
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Función para agregar un nuevo rol
async function agregarRol(req, res) {
    try {
        const { tipo } = req.body; // Obtén el tipo de rol del cuerpo de la solicitud
        if (!tipo) {
            return res.status(404).json({ message: 'El campo tipo es obligatorio' }); // Valida que "tipo" esté presente
        }
        const nuevoRol = await Role.create({ tipo }); // Crea un nuevo rol
        res.status(201).json(nuevoRol); // Devuelve el rol creado con un código 201 (Creado)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Función para actualizar un rol existente por su id_rol
async function actualizarRol(req, res) {
    try {
        const { tipo } = req.body; // Obtén el tipo de rol del cuerpo de la solicitud
        const rol = await Role.findByPk(req.params.id_rol); // Busca el rol por su id
        if (rol) {
            await rol.update({ tipo }); // Actualiza el rol
            res.json(rol); // Devuelve el rol actualizado
        } else {
            res.status(404).json({ message: 'Rol no encontrado' }); // Si no existe, devuelve un error 404
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Exporta el router para usarlo en otros archivos
module.exports = router;
