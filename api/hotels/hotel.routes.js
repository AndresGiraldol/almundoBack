var Hotels = require('./hotel.controller');

module.exports = (router) => {

    router.post('/hotels', Hotels.createHotels);
    router.get('/hotels/:lastItem/:numItem', Hotels.getHotels);
    router.get('/hotels', Hotels.getHotels);
    router.get('/hotels/search/:lastItem/:numItem', Hotels.filterHotel);
    router.get('/hotels/search/', Hotels.filterHotel);
    router.put('/hotels/update/:id', Hotels.updateHero);
    router.delete('/hotels/remove/:id', Hotels.removeHero);

}