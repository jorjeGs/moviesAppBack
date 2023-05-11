require('dotenv').config();

const app = require('./app');
const {swaggerDocs: v1SwaggerDocs} = require('./swagger') //importing swagger documents
require('./database');

//async para marcar el uso de await
async function main(){
    await app.listen(app.get('port')); //metodo asincrono por await, a que inicie el servidor
    console.log('servidor en puerto ', app.get('port'));
    v1SwaggerDocs(app, app.get('port')); //added function to swagger documentation
}

main();