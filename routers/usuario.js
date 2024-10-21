const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Usuario = require('../models/SQL_Facturacion');

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarUs)
router.put('/modificarPorId/:id', modificarUs)
router.get('/mostrar', mostrarEmpleados)

//localhost:2000/DonJuan/stock/mostrarPorId/50



async function agregarUs(req, res) {
    try {

        const body = req.body

        if (!body || !body.id_us) //
            res.status(404).json({ msg: "faltan datos para insertar" })

        const usuario = await Usuario.create(json) //crea usuario
        //registro tabla persona?

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function modificarUs(req, res, next) { //nex?

    try {

        //0° Verificar permisos del usuairo para poder realzar esta accion
        if (true)
            res.status(401)

        const usuario = await Usuario.find();

        if (!usuario) {
            return res.status(400).json({ msg: "No se encontraron datos" });
        }

        //algo?

        res.status(201).json({
            msg: "Actualización echa con éxito"
        });

    } catch (error) {
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }

}

async function mostrarEmpleados(req, res) {
    //se ve por el rol
    try {
        const id = req.params.id; //rol

        if (!id)

            res.status(404).json({ msg: "ID no encontrado" })

        // Buscar el empleado en la base de datos usando el ID 
        const empleado = await Usuario.findById(id);

        // Verificar si el empleado fue encontrada
        if (!empleado) {
            return res.status(404).json({ msg: "Empleado no encontrada" });
        }

        // Devolver los datos del empleado 
        res.status(200).json(empleado);
    } catch (error) {
        // Manejar cualquier error
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }
}

