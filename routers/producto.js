const express = require('express');
const router = express.Router();

const Productos = require('../models/SQL_Productos');

router.post('/agregar', agregarProducto);
router.get('/mostrar', mostrarProductos);//comercializable = true
router.get('/buscarPorNombre', buscarProductos); //http://localhost:3000/producto/buscarPorNombre?nombre=Martillo GET Params key=nombre values Martilllo
router.put('/modificar/:id_producto', modificarProducto); //http://localhost:3000/producto/modificar/1
router.delete('/deshabilitar/:id_producto', deshabilitarProducto);//http://localhost:3000/producto/deshabilitar/1

async function agregarProducto(req, res) {
    try {
        const { nombre, precio_compra, precio_venta, comercializable } = req.body;  // Cambié de req.json a req.body

        if (!nombre || !precio_venta || !precio_compra) {  // También cambié json por las variables individuales
            return res.status(404).json({ msg: "Faltan datos del producto" });
        }

        const resulProducto = await Productos.create({ nombre, precio_compra, precio_venta, comercializable });  // Cambié el objeto a enviar

        if (!resulProducto)
            return res.status(404).json({ msg: "No se pudo crear el producto" });

        res.status(201).json(resulProducto);
    } catch (error) {
        console.error(error);  // Agrega esta línea para capturar el error en la consola
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

/*
{

"nombre":"Martillo Philips",
"precio_venta":"150",
"precio_compra":"50"

}
*/



async function mostrarProductos(req, res) {

    try {
        /*
        req.isAdmin = true;

        if (!req.isAdmin || !req.isEmpleado) {
            res.status(401).send('No autorizado');
        }
*/  
        //sin fechas
        const productos = await Productos.findAll({ where: { comercializable: true } });

        if (!productos) {

            return res.status(404).json({ msg: "No se encontraron productos" });
        }

        // Envía la respuesta con los datos del producto
        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

async function buscarProductos(req, res) {
    try {
        // Validar si el usuario tiene permisos
        /*
        if (!req.isAdmin || !req.isEmpleado) {
            return res.status(401).send('No autorizado');
        }
        */

        // Obtener el nombre del producto desde los parámetros de consulta
        const { nombre } = req.query;

        // Validar que se haya pasado un nombre
        if (!nombre) {
            return res.status(400).json({ msg: "Debe proporcionar un nombre para la búsqueda" });
        }

        // Consultar la base de datos usando Sequelize
        const producto = await Productos.findAll({
            where: { nombre }, // Filtro por nombre
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir campos no necesarios
        });


        // Validar si se encontró algún producto
        if (!producto) {
            return res.status(404).json({ msg: "No se encontraron productos" });
        }

        const productoNoComercializable = producto.find(prod => prod.comercializable === false);

        if (productoNoComercializable) {
            return res.status(400).json({ msg: "El producto ya no existe " });
        }

        // Enviar la respuesta con los datos del producto
        res.status(200).json(producto);
    } catch (error) {
        // Manejar errores del servidor
        console.error(error); // Registrar el error para depuración
        res.status(500).json({ msg: 'Error del servidor' });
    }
}


async function modificarProducto(req, res) {

try {
    /*

    if (!req.isAdmin) {
            
        res.status(401).send('No autorizado');
    }
        */

    const id_producto = req.params.id_producto;
    
    const body = req.body;

    //cambiar a nombre_producto
        const producto = await Productos.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        // Actualizar los campos del proveedor
        await producto.update({
            //cambiar a nombre_producto
            nombre: body.nombre || producto.nombre,
            precio_compra: body.precio_compra || producto.precio_compra,
            precio_venta: body.precio_venta || producto.precio_venta,
            comercializable: body.comercializable||producto.comercializable
        });

        res.status(200).json({ msg: "Producto actualizado exitosamente", producto });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }

}

// Función para deshabilitar un producto
async function deshabilitarProducto(req, res) {
    try {
        /*
        req.isAdmin = true;
        if (!req.isAdmin)
            res.status(401).send('No autorizado');
        */

        const id_producto = req.params.id_producto;

        const body = req.body;

        // Buscar el proveedor por su dni
        const producto = await Productos.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        // Actualizar el campo `habilitado` a `false`
        await producto.update({ comercializable: false });

        res.status(200).json({ msg: "Producto deshabilitado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor', error });
    }
}

module.exports = router;