const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Cliente = require('../SQL_Clientes');

router.post('/agregar', agregarCliente)
router.put('/modificarPorId/:id', modificarClientes)
router.get('/mostrar', mostrarClientes)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarCliente(req, res) {

    try {
        const { dni, nombre, apellido, email, telefono, direccion } = req.body;

        // Validación de datos de entrada
        if (!dni || !nombre || !apellido || !email || !telefono || !direccion) {
            return res.status(404).json({ msg: "Faltan datos." });
        }

        // Crear una Persona 
        const nuevaPersona = await Persona.create({
            dni, nombre, apellido, email, telefono, direccion
        });

        const nuevoCliente = await Cliente.create({
            DNI: nuevaPersona.dni
        });

        res.status(201).json();
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}
/*
 {
    "persona": 36589751256
    "nombre" : 
    "apellido" :
    "dni" :
 }
*/

async function modificarClientes(req, res, next) {

    try {

        const body = req.body;

        const persona = await Persona.findByPK(req.params.id_us);

        if (!persona) {
            return res.status(404).json({ msg: "Persona no encontrada" });
        }
        //dni?
        const cliente = await Cliente.find({ dni: req.params.dni });

        persona = {
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido,
        };

        //verificacion si existe rol
        cliente = {
            id_rol: body.id_rol || cliente.id_rol
        };

        await persona.update();
        await usuario.update();

        res.status(201).json({
            msg: "Actualización éxitosa"
        });

    } catch (error) {
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }

}

async function mostrarClientes(req, res) {

    try {

        const clientes = await Cliente.findAll({
            include: {
                model: Persona,
                attributes: ['nombre', 'apellido', 'dni', 'direccion', 'email', 'telefono']
            }
        });

        if (!clientes) {
            return res.status(404).json({ msg: "No se encontraron clientes" });
        }

        res.status(200).json(clientes);

    } catch (error) {

        res.status(500).json({ msg: 'Error del servidor' });
    }
}

module.exports = router;