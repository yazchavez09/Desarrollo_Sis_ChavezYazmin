const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Cliente = require('../SQL_Persona');
const Cliente = require('../SQL_Clientes');

router.post('/agregar', agregarCliente)
router.put('/modificarPorId/:id', modificarClientes)
router.get('/mostrar', mostrarClientes)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarCliente(req, res) {

    try {

        const body = req.body

        if (!req.body || !req.body.id_us)
            res.status(404).json({ msg: "faltan datos para insertar" })

        const { dni, nombre, apellido, email, telefono, direccion } = body;

        const persona = await Persona.create(
            { dni, nombre, apellido, email, telefono, direccion }
        )

        if (!persona)
            res.status(404).json({ msg: "no se crear persona" })

        const cliente = await Cliente.create(
            {id_cliente, dni }); //sepone el id? es auto increment

        if (!cliente)
            res.status(404).json({ msg: "no se crea cliente" })

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

        const persona = await Persona.findByPK(req.params.dni);

        if (!persona) 
            return res.status(404).json({ msg: "Persona no encontrada" });

        const cliente = await Cliente.findByPK({ id_cliente: req.params.id_cliente });

        if (!cliente)
            return res.status(400).json({ msg: "Cliente no encontrado" });

        persona = {
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido || persona.apellido,
            email: body.email || persona.email,
            telefono: body.telefono || persona.telefono,
            direccion: body.direccion || persona.direccion
        };

        await persona.update();
        await cliente.update();

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
                where: { enable: true },
                model: Persona,
                attributes: [nombre, apellido, dni, direccion, email, telefono]
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