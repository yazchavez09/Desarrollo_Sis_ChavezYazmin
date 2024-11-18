const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Facturacion = require('../models/SQL_Facturacion');
const Carrito = require('../models/SQL_Carrito');
const Cliente = require('../models/SQL_Clientes');
const Usuario = require('../models/SQL_Usuario');
const Persona = require('../models/SQL_Persona');
const Item_carrito = require('../models/SQL_Item_carrito');
const Producto = require('../models/SQL_Productos');

//localhost:2000/DonJuan/stock/mostrarPorId/50

// Rutas
router.post('/agregar', agregarFactura); // Crea una factura verificando cliente y empleado habilitados, cargando productos y calculando el total
router.get('/mostrar', mostrarFactura); // Muestra la última factura creada
router.get('/mostrar/:fecha', mostrarFacturaPorFecha); // Muestra facturas de una fecha específica
router.get('/mostrarPorCliente/:id_cliente', mostrarFacturasCliente); // Muestra facturas de un cliente específico

// Función para agregar una factura
async function agregarFactura(req, res) {

    try {
        const { id_cliente, id_carrito, id_usuario } = req.body;

        // Verifica que el cliente esté habilitado
        const cliente = await Cliente.findOne({ where: { id_cliente, enable: true } });
        if (!cliente) {
            return res.status(404).json({ msg: "Cliente no habilitado" });
        }

        // Verifica que el vendedor esté habilitado
        const vendedor = await Usuario.findOne({ where: { id_usuario: id_usuario, '$Persona.enable$': true }, include: Persona });

        if (!vendedor) {
            return res.status(404).json({ msg: "Vendedor no habilitado" });
        }

        // Verifica que el carrito existe y tiene productos
        const carrito = await Carrito.findByPk(id_carrito, {
            include: {
                model: Item_carrito,
                include: {
                    model: Producto,
                    attributes: ['nombre_producto', 'precio_venta']
                }
            }
        });

        if (!carrito || !carrito.ItemCarritos.length) {
            return res.status(404).json({ msg: "El carrito no tiene productos" });
        }

        // Calcular el precio total de la compra sumando los subtotales de cada producto
        let monto_F = 0;
        carrito.ItemCarritos.forEach(item => {
            monto_F += item.subtotal;
        });

        // Crear la factura con la fecha actual
        const fecha_actual = new Date();
        const result = await Facturacion.create({ id_cliente, monto_F, id_carrito, id_usuario, fecha: fecha_actual });

        res.status(201).json({ nro_Factura: result.nro_Factura, totalCompra: monto_F, fecha: fecha_actual, productos: carrito.ItemCarritos });
        
    } catch (error) {

        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

// Función para mostrar la última factura creada
async function mostrarFactura(req, res) {
    try {
        const ultimaFactura = await Facturacion.findOne({
            order: [['createdAt', 'DESC']],
            include: [
                { model: Cliente, attributes: ['id_cliente'], include: { model: Persona, attributes: ['nombre', 'apellido'] } },
                { model: Usuario, attributes: ['id_persona'], include: { model: Persona, attributes: ['nombre', 'apellido'] } }
            ]
        });

        if (!ultimaFactura) {
            return res.status(404).json({ msg: "No se encontró ninguna factura" });
        }

        res.status(200).json(ultimaFactura);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

// Función para mostrar facturas por fecha específica
async function mostrarFacturaPorFecha(req, res) {
    try {
        const { fecha } = req.params;

        const facturas = await Facturacion.findAll({
            where: { fecha },
            include: [
                { model: Cliente, include: { model: Persona, attributes: ['nombre', 'apellido'] } },
                { model: Usuario, include: { model: Persona, attributes: ['nombre', 'apellido'] } }
            ]
        });

        if (!facturas) {
            return res.status(404).json({ msg: "No se encontraron facturas para la fecha seleccionada" });
        }

        res.status(200).json(facturas);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }

}

// Función para mostrar facturas de un cliente específico
async function mostrarFacturasCliente(req, res) {
    try {
        const { id_cliente } = req.params;

        const facturas = await Facturacion.findAll({
            where: { id_cliente },
            include: [
                { model: Cliente, include: { model: Persona, attributes: ['nombre', 'apellido'] } },
                { model: Usuario, include: { model: Persona, attributes: ['nombre', 'apellido'] } }
            ]
        });

        if (!facturas) {
            return res.status(404).json({ msg: "No se encontraron facturas para el cliente seleccionado" });
        }

        res.status(200).json(facturas);
        
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}


module.exports = router;