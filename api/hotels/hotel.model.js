var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El campo name es un campo requerido']
    },
    stars: {
        type: Number,
        required: [true, 'El campo stars es un campo requerido'],
        min: [1, 'El valor del campo `{PATH}` Debe ser minimo de {MIN}.'],
        max: [5, 'El valor del campo `{PATH}` Debe ser maximo de {MAX}.'],
    },
    price: {
        type: Number,
        required: [true, 'El campo price es un campo requerido']
    },
    image: {
        type: String,
        required: [true, 'El campo image es un campo requerido']
    },
    amenities: {
        type: Array,
        required: [true, 'El campo amanities es un campo requerido']
    }

});

hotelSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = hotelSchema;
//module.exports = mongoose.model('Hotel', hotelSchema);