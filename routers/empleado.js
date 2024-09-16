const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarEmpleado)
router.put('/modificarPorDni/:dni', modificarEmpleado)
router.get('/mostrar', mostrarEmpleado)

//localhost:2000/DonJuan/stock/mostrarPorId/50

// Puedes definir más rutas HTTP como POST, PUT, DELETE, PATCH aquí.
// Ejemplos:
// router.post('/ruta', handlerFunction); // Maneja solicitudes POST en '/ruta'
// router.put('/ruta', handlerFunction);  // Maneja solicitudes PUT en '/ruta'
// router.delete('/ruta', handlerFunction); // Maneja solicitudes DELETE en '/ruta'
// router.patch('/ruta', handlerFunction); // Maneja solicitudes PATCH en '/ruta'

// Función que maneja la solicitud GET a '/home'
// (info que llega ,  info que sale)
// (  request      ,    response   )




function agregarEmpleado (req, res){

    //0° Verificar permisos del usuairo para poder realzar esta accion
    if (true)
        res.status(401)

    //1° recuperamos info desde PARAM o de BODY
    const body = req.body

    //2° verificamos que los datos recuperados esten validos 
    if (body === '' || body.username === '')
        res.status(404).json({ msg: "Campos incompletos" })

    if (dni === '')
        res.status(404).json({ msg: "Campos incompletos" })


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

function modificarEmpleado (req, res){

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

function mostrarEmpleado (req, res){
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


function metodosParaRes(req, res) {
    // Envía una respuesta con estado 200 y un mensaje JSON
    const json = { nombre: "pepe", apellido: "suares" }
    res.status(200).json(json);

    // Opcional: Enviar una respuesta con estado 404 y mensaje 'Not Found'
    // res.status(404).send('Not Found');

    // Opcional: Enviar una respuesta con estado 404 sin cuerpo
    //res.sendStatus(404);

    // Opcional: Enviar una respuesta con cuerpo como texto
    // res.send('Hello World');

    // Opcional: Enviar una respuesta con cuerpo como JSON
    // res.json({ message: 'Hello World' });

    // Opcional: Redirige la solicitud a una nueva URL
    // res.redirect('/new-page');
    // res.redirect(301, '/permanent-new-page'); // Redirección permanente con estado 301

    // Opcional: Envía un archivo como respuesta
    // res.sendFile('home.js');

    // Opcional: Finaliza la respuesta
    // res.end(); // Finaliza la respuesta sin enviar datos
    // res.end('Goodbye'); // Finaliza la respuesta enviando 'Goodbye'
}

function metodosParaReq(req, res) {
    // Obtiene el parámetro "id" de la URL. Por ejemplo, si la URL es /home/:id, req.params.id contiene el valor de "id".
    const id = req.params.id;

    // Obtiene el parámetro de consulta "search" de la URL. Por ejemplo, si la URL es /home?search=valor, req.query.search contiene "valor".
    const search = req.query.search;

    // Desestructura los campos "name" y "age" del cuerpo de la solicitud. Por ejemplo, si se envían datos en el cuerpo de la solicitud como JSON.
    const { name, age } = req.body;
    // Accede a todo el JSON del cuerpo de la solicitud.
    const json = req.body;
    // Accede a la propiedad "age" dentro del JSON del cuerpo de la solicitud.
    json.age;

    // Obtiene el valor del encabezado "authorization". Por ejemplo, si se envía un token en los encabezados, req.headers['authorization'] contiene el token.
    const token = req.headers['authorization'];

    // Obtiene el método HTTP de la solicitud. Por ejemplo, GET, POST, etc.
    const method = req.method;

    // Obtiene la URL completa de la solicitud.
    const url = req.url;

    // Obtiene la dirección IP del cliente que realiza la solicitud.
    const ip = req.ip;

    // Obtiene la ruta de la solicitud sin la parte de la consulta. Por ejemplo, en /home?search=valor, req.path contiene "/home".
    const path = req.path;

    // Obtiene el protocolo de la solicitud. Por ejemplo, http o https.
    const protocol = req.protocol;

    // Verifica si el contenido de la solicitud es JSON. Devuelve true si es JSON, false en caso contrario.
    const isJson = req.is('application/json');

    // Obtiene el nombre del host de la solicitud. Por ejemplo, www.ejemplo.com.
    const hostname = req.hostname;
}

function codeStatusHTTP() {
    // 1xx: Informativo - La solicitud fue recibida y el proceso continúa.
    res.status(100).json({ message: 'Continuar' }); // 100 Continue

    // 2xx: Éxito - La solicitud se recibió, entendió y aceptó correctamente.
    res.status(200).json({ message: 'OK' }); // 200 OK
    res.status(201).json({ message: 'Recurso creado' }); // 201 Created
    res.status(204).json({}); // 204 No Content

    // 3xx: Redirección - Se requiere una acción adicional para completar la solicitud.
    res.status(301).json({ message: 'Recurso movido permanentemente' }); // 301 Moved Permanently
    res.status(302).json({ message: 'Recurso encontrado en una ubicación diferente' }); // 302 Found
    res.status(304).json({ message: 'No modificado' }); // 304 Not Modified

    // 4xx: Error del cliente - La solicitud contiene una sintaxis incorrecta o no puede procesarse.
    res.status(400).json({ error: 'Solicitud incorrecta' }); // 400 Bad Request
    res.status(401).json({ error: 'No autorizado' }); // 401 Unauthorized
    res.status(403).json({ error: 'Prohibido' }); // 403 Forbidden
    res.status(404).json({ error: 'No encontrado' }); // 404 Not Found
    res.status(409).json({ error: 'Conflicto' }); // 409 Conflict

    // 5xx: Error del servidor - El servidor falló al completar una solicitud aparentemente válida.
    res.status(500).json({ error: 'Error interno del servidor' }); // 500 Internal Server Error
    res.status(501).json({ error: 'No implementado' }); // 501 Not Implemented
    res.status(502).json({ error: 'Puerta de enlace incorrecta' }); // 502 Bad Gateway
    res.status(503).json({ error: 'Servicio no disponible' }); // 503 Service Unavailable
    res.status(504).json({ error: 'Tiempo de espera de la puerta de enlace agotado' }); // 504 Gateway Timeout

}

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
