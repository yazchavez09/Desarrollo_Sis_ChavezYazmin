// Importa las dependencias necesarias
const express = require('express') // Framework para construir la aplicación web
const cookieParser = require('cookie-parser') // Middleware para analizar cookies
const logger = require('morgan') // Middleware para registrar solicitudes HTTP
const cors = require('cors') // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Importa los routers y middlewares personalizados
 // Router para manejar rutas relacionadas con el estado del servidor
const stockRouter = require('./routers/stock')
const empleado = require ('./routers/empleado')


// Crea una aplicación Express
const app = express()

// Middleware para registrar solicitudes HTTP en modo de desarrollo
app.use(logger('dev'))

// Opciones de configuración de CORS
const corsOptions = {
    origin: 'http://example.com', // Origen permitido (en producción, debes especificar el dominio exacto)
    methods: ['GET', 'POST', 'PUT' , 'DELETE' , 'PATCH'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  };

// Middleware para habilitar CORS, permitiendo solicitudes desde diferentes dominios
app.use(cors(corsOptions))

// Middleware para analizar cuerpos de solicitudes JSON
app.use(express.json())

// Middleware para analizar cuerpos de solicitudes con URL codificada
app.use(express.urlencoded({ extended: false }))

// Middleware para analizar cookies en las solicitudes
app.use(cookieParser())


// Ruta para evitar el error de favicon no encontrado
// Esto evita que el servidor responda con un error 404 cuando el navegador solicita un favicon
app.get('/favicon.ico', (req, res) => res.status(204)) // Responde con un código de estado 204 (Sin contenido)


// Rutas principales de la aplicación
app.use('/stock',  stockRouter )
app.use('/empleado', empleado)


// Middleware de manejo de errores
// Este middleware captura errores que no han sido manejados en los middlewares o rutas anteriores
//app.use(errorHandler)

// Exporta la aplicación para su uso en otros módulos (por ejemplo, en el archivo de arranque)
module.exports = app