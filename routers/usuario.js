const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Usuario = require('../models/SQL_Usuario');
const Persona = require('../models/SQL_Persona');
const Rol = require('../models/SQL_Rol');

// Rutas
router.post('/agregar', agregarUs); // http://localhost:3000/usuario/agregar POST Body raw
router.put('/modificarPorId/:dni_persona/:id_usuario', modificarUs); // http://localhost:3000/usuario/modificarPorId/9945655/2 PUT Body raw
router.get('/mostrarEmpleados', mostrarEmpleados);

async function agregarUs(req, res) {
    try {

        const body = req.body;

        const { dni_persona, nombre, apellido, email, id_rol, nombre_us, contrasenia } = body;
        console.log("Datos recibidos:", body);
        const persona = await Persona.create({ dni_persona, nombre, apellido, email });
        console.log("Persona creada:", persona);
        if (!persona) {
            return res.status(404).json({ msg: "No se pudo crear persona" });
        }

        const usuario = await Usuario.create({ nombre_us, contrasenia, id_rol, dni_persona });
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
        const { dni_persona, id_usuario } = req.params; // Usamos 'id' desde el parámetro de la URL
        const body = req.body;

        // Buscar persona y usuario por su ID
        const persona = await Persona.findByPk(dni_persona);

        if (!persona) {
            return res.status(404).json({ msg: "Persona no encontrada" });
        }


        const usuario = await Usuario.findByPk(id_usuario); // Usamos 'id' aquí también
        if (!usuario) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        // Actualizamos los campos de persona
        await persona.update({
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido || persona.apellido,
            email: body.email || persona.email

        });

        // Actualizamos los campos de usuario
        await usuario.update({
            id_rol: body.id_rol || usuario.id_rol,
            nombre_us: body.nombre_us || usuario.nombre_us
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
