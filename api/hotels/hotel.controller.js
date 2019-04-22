var Hotels = require('./hotel.dao');

// ==========================================
// Obtener todos los hoteles
// ==========================================

exports.getHotels = (req, res, next) => {

    const lastItem = parseInt(req.params.lastItem);
    const numItem = parseInt(req.params.numItem);

    Hotels.get({}, lastItem, numItem, (err, hotel) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los hoteles',
                errors: err
            });
        }

        Hotels.countDocuments({}, (err, count) => {
            res.status(200).json({
                ok: true,
                Hotels: hotel,
                Total: count
            });
        });
    });
};

// ==========================================
// Crear nuevo hotel
// ==========================================

exports.createHotels = (req, res, next) => {

    var body = req.body;

    var hotel = new Hotels({
        name: body.name,
        stars: body.stars,
        price: body.price,
        image: body.image,
        amenities: body.amenities
    });

    Hotels.create(hotel, (err, hotelGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hotel',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hotel: hotelGuardado
        });


    });
};

// ==========================================
// Filtrar Hoteles 
// ==========================================

exports.filterHotel = (req, res, next) => {

    const lastItem = parseInt(req.params.lastItem);
    const numItem = parseInt(req.params.numItem);
    const ArrayStars = req.query.stars.split(',').map(Number) || [];
    const query = {
        name: { $regex: '.*' + req.query.name + '.*' },
        stars: { $in: ArrayStars }
    }

    Hotels.get(query, lastItem, numItem, (err, hotel, count) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los hoteles',
                errors: err
            });
        }

        Hotels.countDocuments(query, (err, count) => {
            res.status(200).json({
                ok: true,
                Hotels: hotel,
                Total: count
            });
        });
    });
};

// ==========================================
// Actualizar Hotel
// ==========================================

exports.updateHero = function(req, res, next) {

    var body = req.body;

    var hotel = {
        name: body.name,
        stars: body.stars,
        price: body.price,
        image: body.image,
        amenities: body.amenities
    };

    Hotels.update({ _id: req.params.id }, hotel, (err, hotelActualizado) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error actualizando el hoteles',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            hotel: hotelActualizado
        });
    });
};

// ==========================================
// Borrar Hotel
// ==========================================

exports.removeHero = function(req, res, next) {
    Hotels.delete({ _id: req.params.id }, (err, hotelBorrado) => {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error borrando el hotel',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            medico: hotelBorrado
        });
    });
}