// Requires
const express = require('express');
const config = require('./config/config');
const db = require('./config/database');
var bodyParser = require('body-parser')

// Iniciar variables
const app = express();
const properties = global.gConfig;

// configurar bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

// Importar Rutas
var hotelRoutes = require('./api/hotels/hotel.routes');

//initialise express router
var router = express.Router();

// Llamado a la coneccion de la base datos
db();

// configurar app.use
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


// Permitir llamados CROSS
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

// use express router
app.use('/', router);

// Rutas
hotelRoutes(router);

app.listen(config.app.port, (req, res) => {
    console.log(`Express server puerto ${config.app.port}: \x1b[32m%s\x1b[0m`, 'online');
});