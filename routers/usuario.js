const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Usuario = require('../models/SQL_Facturacion');
const Persona = require('../models/SQL_Personas');

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

        if (!req.body || !req.body.id_us)
            res.status(404).json({ msg: "faltan datos para insertar" })

        const { dni, nombre, apellido, email, telefono, direccion, id_rol, nombre_us, contraseña } = body;

        const persona = await Persona.create(
            { dni, nombre, apellido, email, telefono, direccion }
        )

        if (!persona)
            res.status(404).json({ msg: "no se pudo insertar al usuario" })

        const usuario = await Usuario.create(
            { nombre_us, contraseña, id_rol, dni });

        if (!usuario)
            res.status(404).json({ msg: "no se pudo insertar al usuario" })

        res.status(201).json();
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

        //localhost:2000/usuario/modificarPorId/23569875

        //if( !req.isAdmin || !req.isEmpleado )
        //    res.status(401);

        const body = req.body;

        const persona = await Persona.findByPK(req.params.id_us);

        if (!persona)
            return res.status(400).json({ msg: "Persona no encontrada" });


        const usuario = await Usuario.findByPK(req.params.id_us);

        if (!usuario)
            return res.status(400).json({ msg: "Persona no encontrada" });

        persona = {
            nombre: body.nombre || persona.nombre,
            apellido: body.apellido || persona.apellido,
        };

        //verificacion si existe rol
        usuario = {
            id_rol: body.id_rol || usuario.id_rol
        };

        const a = await persona.update();
        const b = await usuario.update();

        if (!a)
            return res.status(400).json({ msg: "Error con persona" });

        if (!b)
            return res.status(400).json({ msg: "Error con usuario" }); F

        res.status(201).json({
            msg: "Actualización éxitosa"
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
            attributes: [id_rol], // Especifica los campos que deseas obtener de la tabla 'Usuario'
            include: [{
                where: { enable: true },
                model: Persona,  // Incluye el modelo 'Persona'
                attributes: [nombre, apellido, dni, direccion, email, telefono] // Especifica los campos que deseas obtener de la tabla 'Persona'
            }]
        });
        
        if (!users)
            return res.status(400).json({ msg: "no existen usuarios" });

        // Verificar si el empleado fue encontrada
        // Devolver los datos del empleado 
        res.status(200).json(users);
    } catch (error) {
        // Manejar cualquier error
        res.status(500).json({ msg: "Error al procesar la solicitud" });
    }


}

module.exports = router;