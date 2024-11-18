const express = require('express');
const router = express.Router();
const Persona = require('../models/SQL_Persona');

router.post('/agregar', agregarPersona);
router.put('/dehabilitar',deshabilitarPersona);

async function agregarPersona(req, res) {

    const json = req.body;
    if (!json || !json.DNI || !json.nombre || !json.apellido || !json.email) {
        return res.status(404).json({ msg: "Faltan datos" });
    }

    try {
        const result = await Persona.create(json);
        res.status(201).json({ DNI: result.DNI });
    } catch (error) {
        console.error('Error al agregar persona:', error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}
async function deshabilitarPersona(req, res) {
    try {
        const { dni } = req.params;
        const persona = await Persona.findByPk(dni);

        if (!persona) {
            return res.status(404).json({ msg: "Persona no encontrada" });
        }

        await persona.update({ enable: false });
        res.status(200).json({ msg: "Persona deshabilitada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

router.put('/deshabilitar/:dni', deshabilitarPersona);

module.exports = router;
