const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Facturacion = require('../models/SQL_Facturacion');
const Facturacion = require('../models/SQL_Carrito');

router.post('/agregar', agregarFactura);
router.get('/mostrar', mostrarFactura);
router.get('/mostrar:fecha', mostrarFacturaPorF);//fecha

//localhost:2000/DonJuan/stock/mostrarPorId/50

async function agregarFactura(req, res) {

    try {

    const json = req.body;

    if (!json || !id_cliente||!json.monto_F || !json.id_carrito||!dni_persona) { //carrito quiero la tabla y no se si usar la tabla personas o usuario

        return res.status(404).json({ msg: "Faltan datos para insertar la factura" });
    }

        const result = await Facturacion.create(json);

        res.status(201).json({ Nro_Factura: result.Nro_Factura });
    } catch (error) {
       
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function mostrarFactura (req, res, next){

    try {

        //0° Verificar permisos del usuairo para poder realzar esta accion
        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

            // Obtener los datos de la factura 
            const factura = await Facturacion.findAll();
    
            // Verificar que  no esté vacío
            if (!factura) {
                return res.status(404).json({ msg: "No se encontraron datos" });
            }
            // Devolver el resultado al cliente si la factura fue guardada correctamente
            res.status(201).json({
                msg: "Factura agregada con éxito"});
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            res.status(500).json({ msg: "Error al procesar la solicitud"});
        }
     
}

async function mostrarFacturaPorF (req, res, next){

    try {

        //0° Verificar permisos del usuairo para poder realzar esta accion
        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }

            // Obtener los datos de la factura 
            const factura = await Facturacion.find({fecha});
    
            // Verificar que  no esté vacío
            if (!factura) {
                return res.status(404).json({ msg: "No se encontraron datos" });
            }
            // Devolver el resultado al cliente si la factura fue guardada correctamente
            res.status(201).json({
                msg: "Factura agregada con éxito"});
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            res.status(500).json({ msg: "Error al procesar la solicitud"});
        }
     
}
module.exports = router;