const express = require('express'); // Importa el módulo Express para construir aplicaciones web
const router = express.Router(); // Crea un nuevo enrutador de Express para manejar rutas

// Define una ruta para las solicitudes HTTP GET a '/home'
// Esta ruta es relativa a donde se monte este enrutador. Por ejemplo, si se monta en '/api',
// esta ruta se corresponderá a '/api/home'.
router.post('/agregar', agregarProveedor)
router.put('/modificarPorId/:id', modificarProveedor)
router.get('/mostrar', mostrarProveedor)

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