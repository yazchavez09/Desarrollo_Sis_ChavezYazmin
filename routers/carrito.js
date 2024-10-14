const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarCarrito)
router.put('/modificarPorId/:id', modificarCarrito)
router.get('/mostrar', mostrarCarrito)

//localhost:2000/DonJuan/stock/mostrarPorId/50

