const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost/moviesdatabase2'; //validacion para existencia de URI de base de datos, si no, crea otra

mongoose.connect(URI, {
    //useNewUrlParser: true, //segun doc, siempre considera esta opcion como true, pero bueno ahi ta
    //useFindandmodify: false //deprecated
});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB is connected');
});