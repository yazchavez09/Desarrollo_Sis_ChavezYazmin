const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas


const Facturacion = require('../models/SQL_Facturacion');

// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarVenta)
router.put('/modificar/:nro_factura', modificarVenta) // sin modificar
router.get('/mostrar', mostrarVenta)

//localhost:2000/DonJuan/stock/mostrarPorId/50


async function agregarVenta (req, res, next){
    try {
        // Obtener los datos 
        const body = req.body;

        // Verificar que el cuerpo de la solicitud no esté vacío
        if (!body) {
            res.status(404).json({msg:"faltan datos para insertar"})

        }

        const result = await Venta.create(body); //CREA VENTA

        if (!result)
        res.status(404).json({ msg: "no se pudo insetar los datos en la DB" })
    
        // Guardada correctamente
        res.status(201).json({
            msg: "Se agregó venta"});
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        res.status(500).json({ msg: "Error al procesar la solicitud"});
    }
}

async function modificarVenta (req, res){
    try{
    //0° Verificar permisos del usuairo para poder realzar esta accion
    if (true)
        res.status(401)

    //1° recuperamos info desd PARAM o de BODY
    const body = req.body
    const nro_factura = req.params.nro_factura

    //2° verificamos que los datos recuperados esten validos 
    if ( !json || !json.id_cliente )
        res.status(404).json({ msg: "faltan datos" })

        const factura = await Facturacion.findById(id); //tabla
        // Verificar si fue encontrada
        if (!factura) {
            res.status(404).json({msg:"faltan datos para insertar"})
        }

        // Actualiza con los nuevos datos del body, manteniendo el mismo ID
        Object.assign(factura, body, { nro_factura: nro_factura });
        
        // Guardar los cambios en la base de datos
        const resultado = await factura.save();

        //verificar si el resultado fue encontrado
        if (!resultado) {
            return res.status(404).json({ msg: "Actualización no encontrada" });
        }
        
        // Responder al cliente con la máquina actualizada
        res.status(200).json({
            msg: "Factura modificada con éxito", maquina: resultado});
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        res.status(500).json({ msg: "Error al procesar la solicitud"});
    }

    
}

async function mostrarVenta (req, res, next){

        try {

        //0° Verificar permisos del usuairo para poder realzar esta accion
        if (true)
        res.status(401)

            // Obtener los datos de la factura 
            const factura = await Factura.find();
    
            // Verificar que  no esté vacío
            if (!factura) {
                return res.status(400).json({ msg: "No se encontraron datos" });
            }
            // Devolver el resultado al cliente si la factura fue guardada correctamente
            res.status(201).json({
                msg: "Factura agregada con éxito"});
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            res.status(500).json({ msg: "Error al procesar la solicitud"});
        }
        
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
