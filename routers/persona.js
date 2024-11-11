const express = require('express');
const router = express.Router();
const { Persona } = require('../models');

router.post('/agregar', agregarPersona);
router.get('/mostrar', mostrarPersonas);

async function agregarPersona(req, res) {
    const json = req.body;
    if (!json || !json.DNI || !json.nombre || !json.apellido || !json.email) {
        return res.status(400).json({ msg: "Faltan datos para insertar la persona" });
    }

    try {
        const result = await Persona.create(json);
        res.status(201).json({ DNI: result.DNI });
    } catch (error) {
        console.error('Error al agregar persona:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

function mostrarPersonas(req, res) {
    Persona.findAll()
        .then(personas => {
            if (!personas.length) {
                return res.status(404).json({ msg: "No se encontraron personas" });
            }
            res.status(200).json(personas);
        })
        .catch(error => {
            console.error('Error al mostrar personas:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        });
}

module.exports = router;
