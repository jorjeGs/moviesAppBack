const express = require('express');
const cors = require('cors');
const app = express();

//configuracion
//to run in nodemon, check scripts
//npm run [dev]
app.set('port', process.env.PORT || 4000); //si existe un puerto dado en el env lo toma, si no, el puerto 4000

//aspectos del middleware
app.use(cors()); //para enviar archivos especificos
app.use(express.json()); //para que la app entienda json y strings

//rutas
app.use('/api/users', require('./routes/users'))//respuestas al cliente al acceder a rutas
app.use('/api/movies', require('./routes/movies'))

module.exports = app;