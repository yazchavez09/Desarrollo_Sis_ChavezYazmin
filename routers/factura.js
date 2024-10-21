const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Facturacion = require('../models/SQL_Facturacion');

router.post('/agregar', agregarFactura)
router.get('/mostrar', mostrarFactura)
router.get('/mostrar:fecha', mostrarFacturaPorF)

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarFactura(req, res, next){
    try {
        
        if(!body )
        res.status(404).json({ msg: "faltan datos para insertar" })

        const { dni, nombre, apellido, email, telefono, direccion, id_rol } = body;

        const persona = await Carrito.create(
            { dni, nombre, apellido, email, telefono, direccion }
        )


        const usuario = await Usuario.create(
            { id_rol, dni }
        ) //crea usuario


        // Guardada correctamente
        res.status(201).json({
            msg: "Se agregó factura"});
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
        .find
}