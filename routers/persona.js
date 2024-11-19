const express = require('express');
const router = express.Router();

const Persona = require('../models/SQL_Persona');

router.post('/agregar', agregarPersona); //http://localhost:3000/persona/agregar BODY raw JSON
router.put('/dehabilitar/:dni_persona',deshabilitarPersona); //http://localhost:3000/persona/dehabilitar/7638935 

async function agregarPersona(req, res) {

    const json = req.body;
    
    if (!json || !json.dni_persona || !json.nombre || !json.apellido || !json.email) {
        return res.status(404).json({ msg: "Faltan datos" });
    }

    try {
        const result = await Persona.create(json);
        res.status(201).json({ dni_persona: result.dni_persona });
    } catch (error) {
        console.error('Error al agregar persona:', error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}
async function deshabilitarPersona(req, res) {
    try {
        const { dni_persona } = req.params;
        const persona = await Persona.findByPk(dni_persona);

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
