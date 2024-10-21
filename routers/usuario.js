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

        const { dni, nombre, apellido, email, telefono, direccion, id_rol } = body;

        const persona = await Persona.create(
            { dni, nombre, apellido, email, telefono, direccion }
        )


        const usuario = await Usuario.create(
            { id_rol, dni }
        ) //crea usuario



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    /*
    [
        {
        "dni": 542575,
        "nombre": "ssssss",
        "apellido": "aaaaaa", 
        "email":"asas@gmail.com",  
        "telefono": 4567895, 
        "direccion": "saassa 555",
        "id_rol" 5:
        }

    ]
    */
}

async function modificarUs(req, res, next) {

    try {

        //localhost:2000/usuario/modificarPorId/5

        //if( !req.isAdmin || !req.isEmpleado )
        //    res.status(401);

        const body = req.body;

        const persona = await Persona.findByPK(req.params.dni);

        if (!persona) {
            return res.status(400).json({ msg: "No se encontraron datos" });
        }

        const usuario = await Usuario.find({ dni: req.params.dni });

        persona = {
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido,
        };

        //verificacion si existe rol


        usuario = {
            id_rol: body.id_rol || usuario.id_rol

        };

        await persona.update();
        await usuario.update();

        res.status(201).json({
            msg: "Actualización echa con éxito"
        });

    } catch (error) {
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }

}

async function mostrarEmpleados(req, res) {

    try {
        //const id = req.params.id; 

        // Buscar el empleado en la base de datos usando el ID 
        const users = await Usuario.findAll({
            attributes: [], // Especifica los campos que deseas obtener de la tabla 'Usuario'
            where: {
                id_role: 2,
                enable: true
            },
            include: [{
                model: Persona,  // Incluye el modelo 'Persona'
                attributes: [nombre, apellido, dni, direccion, correo, telefono] // Especifica los campos que deseas obtener de la tabla 'Persona'
            }]
        });

        // Verificar si el empleado fue encontrada


        // Devolver los datos del empleado 
        // res.status(200).json(empleado);
    } catch (error) {
        // Manejar cualquier error
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }


}

