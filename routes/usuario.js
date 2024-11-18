const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Usuario = require('../models/SQL_Usuario');
const Persona = require('../models/SQL_Persona');

// Define una ruta para las solicitudes HTTP GET a '/home'
router.post('/agregar', agregarUs);
router.put('/modificarPorId/:id', modificarUs);
router.get('/mostrar', mostrarEmpleados);

async function agregarUs(req, res) {
    try {
        const body = req.body;

        if (!req.body || !req.body.id_us) {
            return res.status(404).json({ msg: "Faltan datos para insertar" });
        }

        const { dni, nombre, apellido, email, telefono, direccion, id_rol, nombre_us, contraseña } = body;

        const persona = await Persona.create({ dni, nombre, apellido, email, telefono, direccion });
        if (!persona) {
            return res.status(404).json({ msg: "No se pudo crear persona" });
        }

        const usuario = await Usuario.create({ nombre_us, contraseña, id_rol, dni });
        if (!usuario) {
            return res.status(404).json({ msg: "No se pudo crear usuario" });
        }

        res.status(201).json({ msg: "Usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

async function modificarUs(req, res) {
    try {
        const { id } = req.params; // Usamos 'id' desde el parámetro de la URL
        const body = req.body;

        // Buscar persona y usuario por su ID
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(400).json({ msg: "Persona no encontrada" });
        }

        const usuario = await Usuario.findByPk(id); // Usamos 'id' aquí también
        if (!usuario) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        // Actualizamos los campos de persona
        await persona.update({
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido || persona.apellido,
            email: body.email || persona.email,
            telefono: body.telefono || persona.telefono,
            direccion: body.direccion || persona.direccion
        });

        // Actualizamos los campos de usuario
        await usuario.update({
            id_rol: body.id_rol || usuario.id_rol
        });

        res.status(200).json({ msg: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }
}

async function mostrarEmpleados(req, res) {
    try {
        const users = await Usuario.findAll({
            attributes: ['id_rol'], // Asegúrate de que 'id_rol' sea una columna válida en Usuario
            include: [{
                model: Persona,
                where: { enable: true }, // Asegúrate de que 'enable' sea una columna de Persona
                attributes: ['nombre', 'apellido', 'dni', 'direccion', 'email', 'telefono']
            }]
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No existen usuarios" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }
}

module.exports = router;
