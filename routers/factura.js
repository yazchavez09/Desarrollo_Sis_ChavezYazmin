const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarFactura)
router.put('/modificar/:nro_factur', modificarFactura)
router.get('/mostrar', mostrarFactura)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarFactura(req, res, next){
    try {
        // Obtener los datos 
        const body = req.body;

        // Verificar que el cuerpo de la solicitud no esté vacío
        if (!body) {
            res.status(404).json({msg:"faltan datos para insertar"})

        }

        const result = await modificarFactura.create(body); //CREA Factura

        if (!result)
        res.status(404).json({ msg: "no se pudo insetar los datos en la DB" })
    
        // Guardada correctamente
        res.status(201).json({
            msg: "Se agregó factura"});
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        res.status(500).json({ msg: "Error al procesar la solicitud"});
    }
}

async function modificarFactura (req, res, next){
    try{
    //0° Verificar permisos del usuairo para poder realzar esta accion
    if (true)
        res.status(401)

    //1° recuperamos info desd PARAM o de BODY
    const body = req.body
    const nro_factura = req.params.nro_factura

    //2° verificamos que los datos recuperados esten validos 
    if ( !json || !json.nro_factura )
        res.status(404).json({ msg: "faltan datos" })

        const factura = await Facturacion.findById(nro_factura); //tabla?
        
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

async function mostrarFactura (req, res, next){
 

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