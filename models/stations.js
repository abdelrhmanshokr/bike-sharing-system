const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create stations' schema
const StationSchema = new Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    areaName: String,
    innerAreaId: Number
});

//create stations' model to migrate to the db 
const Station = mongoose.model('station', StationSchema);

module.exports = Station;