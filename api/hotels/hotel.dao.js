var mongoose = require('mongoose');
var hotelSchema = require('./hotel.model');

hotelSchema.statics = {
    create: function(data, cb) {
        var hotel = new this(data);
        hotel.save(cb);
    },

    get: function(query, lastItem, numItem, cb) {
        this.find(query, cb)
            .skip(lastItem)
            .limit(numItem);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    }
};

var hotelsModel = mongoose.model('Hotel', hotelSchema);
module.exports = hotelsModel;