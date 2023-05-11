const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//metadata info about  our api
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "MovieAPI", version: "1.0"},
    },
    apis: ["src/routes/movies.js"],
};

//DOcs in JSON format 
const swaggerSpec = swaggerJSDoc(options);

//function to setup our docs
const swaggerDocs = (app, port) =>{
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) =>{
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log("Docs available at http://localhost:4000/api/docs")
};

module.exports = { swaggerDocs } //importado en indexjs