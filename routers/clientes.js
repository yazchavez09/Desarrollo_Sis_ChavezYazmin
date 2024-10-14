const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarCliente)
router.put('/modificarPorId/:id', modificarCliente)
router.get('/mostrar', mostrarCliente)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarCliente (req, res)
{
    const json = req.body

    if( !json || !json.id_cliente  ) //
        res.status(404).json({msg:"faltan datos para insertar"})

    const pers = await Persona.create( json ) //crea a persona

    if(!pers)
        res.status(404)
    
    const todos = await Cliente.findAll()
    //falto seleccionar el ultimo json disponible
    
    const result = await Cliente.create( { DNI: pers.dni } )
    if( !result )
        res.status(404).json({msg:'no se pudo gruardar'})

    res.status(201).json( {ID: result.id_cliente} )   
}
/*
 {
    "persona": 36589751256
    "nombre" : 
    "apellido" :
    "dni" :
 }
*/

function modificarCliente (req, res){
    //0° Verificar permisos del usuairo para poder realzar esta accion
    if (true)
        res.status(401)

    //1° recuperamos info desd PARAM o de BODY
    const body = req.body
    const dni = req.params.dni

    //2° verificamos que los datos recuperados esten validos 
    if (body === '' || body.username === '')
        res.status(404).json({ msg: "faltan datos" })

    if (dni === '')
        res.status(404).json({ msg: "faltan datos" })


    //3° conexion DB y Consultas
    const DB = { msg: "asasas" }

    if (DB === '')
        res.status(500).json({ msg: "error en DB" })

    const datos = {nombre:"asasas"};

    if (datos === '')
        res.status(500).json({ msg: "error en los datos a enviar" })

    const zapato = body.precio
    res.status(200).json({zapato})
}

function mostrarCliente (req, res){
        //0° Verificar permisos del usuairo para poder realzar esta accion
        if (true)
        res.status(401)

    //1° recuperamos info desd PARAM o de BODY
    const body = req.body

    //2° verificamos que los datos recuperados esten validos 
    if (body === '' || body.username === '')
        res.status(404).json({ msg: "faltan datos" })

    if (id === '')
        res.status(404).json({ msg: "faltan datos" })


    //3° conexion DB y Consultas
    const DB = { msg: "asasas" }

    //4° verificamos que los datos devuelto por la DB esten correcto y no VACIO
    if (DB === '')
        res.status(500).json({ msg: "error en DB" })


    //5°  logica de negocios & post-procesado de datos a enviar
    const datos = {nombre:"asasas"};

    //6° validar que los datos post-procesados esten todos correcto
    if (datos === '')
        res.status(500).json({ msg: "error en los datos a enviar" })

    //7° devolver informacion pedida al usuario
    const zapato = body.precio
    res.status(200).json({zapato})
}

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
