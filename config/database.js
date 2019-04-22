//require mongoose module
const mongoose = require('mongoose');

//require chalk module to give colors to console text
const chalk = require('chalk');

//require database URL from properties file
const config = require('./config');

const connectURL = config.db.host;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = function() {

    mongoose.set('useCreateIndex', true);
    // console.log(connectURL);
    // mongoose.connect(connectURL, { useNewUrlParser: true }, (err, res) => {

    //     if (err) throw err;

    //     console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

    // });
    mongoose.connect(connectURL, { useNewUrlParser: true });

    mongoose.connection.on('connected', function() {
        console.log(connected("Mongoose default connection is open to ", connectURL));
    });

    mongoose.connection.on('error', function(err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function() {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
    });
}