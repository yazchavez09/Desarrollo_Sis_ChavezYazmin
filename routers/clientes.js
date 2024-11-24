const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Cliente = require('../models/SQL_Clientes');
const Persona = require('../models/SQL_Persona');

router.post('/agregar', agregarCliente)
router.put('/modificarPorId/:dni_persona/:id_cliente', modificarClientes)//http://localhost:3000/cliente/modificarPorId/4675/2
router.get('/mostrar', mostrarClientes)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarCliente(req, res) {
    try {
        const { dni_persona, nombre, apellido, email } = req.body;

        const existePersona = await Persona.findByPk(dni_persona);
        if (existePersona) {
            return res.status(400).json({ msg: "La persona ya existe" });
        }

        // Validación manual de datos de entrada
        if (!dni_persona || !nombre || !apellido || !email) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Crear la persona
        const persona = await Persona.create({ dni_persona, nombre, apellido, email });
        if (!persona) {
            return res.status(404).json({ msg: "No se pudo crear persona" });
        }

        // Crear el cliente vinculado
        const cliente = await Cliente.create({ dni_persona });
        if (!cliente) {
            return res.status(404).json({ msg: "No se pudo crear cliente" });
        }

        res.status(201).json({
            msg: "Cliente creado exitosamente",
            persona,
            cliente
        });
        
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({
            msg: "Error interno del servidor"
        });
    }
}


/*
{
    "dni_persona":999,
    "nombre":"Byron",
    "apellido":"CH",
    "email":"yjkj.chavez.et32@gmail.com"
}
*/

async function modificarClientes(req, res, next) {

    try {
        const { dni_persona, id_cliente } = req.params;
        const body = req.body;

        const persona = await Persona.findByPk(dni_persona);

        if (!persona)
            return res.status(404).json({ msg: "Persona no encontrada" });

        const cliente = await Cliente.findByPk(id_cliente);

        if (!cliente)
            return res.status(400).json({ msg: "Cliente no encontrado" });

        await persona.update({
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido || persona.apellido,
            email: body.email || persona.email
        });

        await cliente.update();

        res.status(201).json({
            msg: "Actualización éxitosa"
        });

    } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }

}

//ERROR
async function mostrarClientes(req, res) {
    try {
        const clientes = await Cliente.findAll({
            include: [
                {
                    model: Persona, // Relación definida entre Cliente y Persona
                    attributes: ['nombre', 'apellido', 'dni_persona', 'direccion', 'email', 'telefono'],
                    where: { enable: true }, // Filtro para `enable` en el modelo Persona
                }
            ]
        });

        if (clientes.length === 0) {
            return res.status(404).json({ msg: "No se encontraron clientes" });
        }

        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al mostrar clientes:", error); // Log en el servidor
        res.status(500).json({ msg: 'Error del servidor', error: error.message });
    }
}




module.exports = router;