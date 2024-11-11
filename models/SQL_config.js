const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize y conectarse a la base de datos MySQL
const sequelize = new Sequelize('ferreteria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a MySQL exitosa.');
  })
  .catch((err) => {
    console.error('Error al conectarse a MySQL:', err);
  });


// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos MySQL.');
  })
  .catch((err) => {
    console.error('Error al sincronizar los modelos:', err);
  });


module.exports = sequelize;