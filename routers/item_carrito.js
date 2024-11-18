const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

const Item_carrito = require('../models/SQL_Productos');
const Item_carrito = require('../models/SQL_Carrito');
const Item_carrito = require('../models/SQL_Item_carrito');

router.post('/agregar', agregarProducto)
router.delete('/eliminar', EliminarProducto)

/*
    {
        'id_producto' : 5014,
        'id_carrito' : 2,
        'cant_p' : 3   
    }
*/
async function agregarProducto(req, res) {
    try {
        const body = req.body

        if (!req.body || !req.body.id_prod)
            res.status(404).json({ msg: "faltan datos" })

        const prod = await Producto.findByPk(body.id_producto);
     
        if (!prod)
            res.status(404).json({ msg: "faltan datos" })

        const subtotal =body.cant_p * prod.precio_venta;

        const result = await Item_carrito.create( { ...body , subtotal } );

        if (!result)
            res.status(404).json({ msg: "faltan datos" })


        res.status(201).json();
    } catch (error) {
       
        res.status(500).json({ msg: 'Error del servidor' });
    }
}


/*
    {
        'id_carrito' : 1,
        'producto' : 304
    }
*/
async function EliminarProducto(req, res) {

    const body = req.body;

const eliminar = await Item_carrito.findAll({  
    where:{id_carrito : body.id_carrito, id_prod : body.producto}
});

Item_carrito.detete(eliminar);

}

module.exports = router;